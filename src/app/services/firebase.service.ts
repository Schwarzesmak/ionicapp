import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { LocalStorageService } from './local-storage.service';  // Importamos el servicio de LocalStorage
import { NetworkService } from './network.service';  // Importamos el servicio de Network para detectar conexión

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  localStorageService = inject(LocalStorageService);  // Inyectamos el servicio de LocalStorage
  networkService = inject(NetworkService);  // Inyectamos el servicio de Network

  // ======================== AUTH ==========================

  // Acceder
  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Crear Usuarios
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, { displayName });
  }

  // Enviar email para recuperar la contraseña
  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // ========================== BASE DE DATOS ==========================

  // Método para agregar un documento a una colección (con soporte offline)
  async addDocumentToCollection(collectionPath: string, data: any) {
    const isOnline = await this.networkService.isOnline();  // Detecta si estamos online

    if (isOnline) {
      try {
        const docRef = await addDoc(collection(getFirestore(), collectionPath), data);
        console.log("Documento creado con ID:", docRef.id);
        return docRef;
      } catch (error) {
        console.error("Error al agregar el documento:", error);
        throw error;
      }
    } else {
      // Si estamos offline, guardamos los datos en LocalStorage
      const pendingData = this.localStorageService.getItem('pendingDocuments') || [];
      pendingData.push({ collectionPath, data });
      this.localStorageService.setItem('pendingDocuments', pendingData);
      console.log("Datos guardados en localStorage por estar offline");
    }
  }

  // Sincroniza los datos pendientes en LocalStorage cuando vuelve la conexión
  async syncPendingData() {
    const pendingData = this.localStorageService.getItem('pendingDocuments') || [];

    if (pendingData.length > 0) {
      for (const item of pendingData) {
        try {
          await this.addDocumentToCollection(item.collectionPath, item.data);  // Subir cada documento a Firebase
        } catch (error) {
          console.error("Error al sincronizar los datos pendientes:", error);
        }
      }

      // Borrar los datos pendientes después de haber sido subidos
      this.localStorageService.removeItem('pendingDocuments');
      console.log("Datos sincronizados con Firebase");
    }
  }

  // Obtener documentos de una colección
  async getCollection(collectionPath: string) {
    const q = query(collection(getFirestore(), collectionPath));
    const querySnapshot = await getDocs(q);
    let documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  }

  // Obtener un documento por ID de una colección
  async getDocumentById(collectionPath: string, id: string) {
    const docRef = doc(getFirestore(), collectionPath, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return { ...data, id: docSnap.id };
    } else {
      throw new Error("No such document!");
    }
  }

  // Método para obtener los estudiantes (anteriormente alumnos)
  async getAlumnos() {
    const alumnos = await this.getFilteredDocuments('users', 'role', 'estudiante');
    return alumnos;
  }

  // Eliminar una asignatura por ID
  deleteAsignatura(asignaturaId: string): Promise<void> {
    const path = `asignaturas/${asignaturaId}`;
    return this.firestore.doc(path).delete();
  }

  // Obtener el nombre del usuario autenticado
  async getAuthenticatedUserName(): Promise<string | null> {
    const currentUser = getAuth().currentUser;
    if (currentUser && currentUser.displayName) {
      return currentUser.displayName;
    } else if (currentUser) {
      return currentUser.email;
    }
    return null;
  }

  // Obtener el usuario logueado por su UID de Firebase Auth
  async getUsuarioLogueado() {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      const uid = currentUser.uid;
      try {
        const userData = await this.getDocumentById('users', uid);
        return userData;
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        throw error;
      }
    }
    return null;
  }

  // Método para actualizar un documento en Firestore
  async updateDocument(path: string, data: any) {
    try {
      await setDoc(doc(getFirestore(), path), data, { merge: true });
      console.log("Documento actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el documento:", error);
      throw error;
    }
  }

  // Cerrar sesión
  async logout(): Promise<void> {
    try {
      await getAuth().signOut();
      console.log('Sesión cerrada exitosamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }

  // Obtener los datos de un documento de Firestore
  async getDocument(path: string) {
    const docSnap = await getDoc(doc(getFirestore(), path));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  }

  // Actualizar los datos de un usuario en Firestore
  async setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data, { merge: true });
  }

  // Subir una imagen de perfil a Firebase Storage
  async uploadProfileImage(file: File, uid: string): Promise<string> {
    const storage = getStorage();
    const storageRef = ref(storage, `profileImages/${uid}`);
    try {
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile image:', error);
      throw error;
    }
  }
}
