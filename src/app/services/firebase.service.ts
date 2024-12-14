import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

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

  // Método para agregar un documento a una colección
  async addDocumentToCollection(collectionPath: string, data: any) {
    try {
      const docRef = await addDoc(collection(getFirestore(), collectionPath), data);
      console.log("Documento creado con ID:", docRef.id);
      return docRef;
    } catch (error) {
      console.error("Error al agregar el documento:", error);
      throw error;
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
      return { ...data, id: docSnap.id };  // Aquí el 'id' es el ID de Firestore
    } else {
      throw new Error("No such document!");
    }
  }

  // Obtener documentos filtrados
  async getFilteredDocuments(collectionPath: string, field: string, value: string) {
    const q = query(collection(getFirestore(), collectionPath), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    let documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  }

  // Método para obtener los estudiantes (anteriormente alumnos)
  async getAlumnos() {
    // Cambié el valor del filtro a 'estudiante'
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
      return currentUser.email; // Si no tiene nombre, mostrar el email
    }
    return null;
  }


  // Método para obtener el apellido del usuario autenticado
async getAuthenticatedUserLastname(): Promise<string | null> {
  const currentUser = getAuth().currentUser;
  if (currentUser) {
    // Si tienes el apellido almacenado en algún campo específico, puedes acceder a él aquí.
    // Supongo que el apellido podría ser parte del displayName o en algún otro campo adicional.
    // Si solo tienes el displayName con nombre y apellido juntos, puedes dividirlo
    const nombreCompleto = currentUser.displayName;
    if (nombreCompleto) {
      const [nombre, apellido] = nombreCompleto.split(' ');
      return apellido || null;  // Devuelve solo el apellido
    }
  }
  return null;
}


// Obtener el usuario logueado por su UID de Firebase Auth
async getUsuarioLogueado(): Promise<User | null> {
  const currentUser = getAuth().currentUser; // Obtiene el usuario autenticado
  if (currentUser) {
    const uid = currentUser.uid;
    try {
      const userData = await this.getDocumentById('users', uid); // Asegúrate de tener la colección 'users' en Firestore
      // Combina los datos del usuario con su id y los tipa como User
      return { id: uid, ...(userData as User) };
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
