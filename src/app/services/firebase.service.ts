import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc, collection, addDoc, query, where, getDocs } from '@angular/fire/firestore';

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

  // Setear un documento en Firestore
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Obtener un documento
  async getDocument(path: string) {
    const docSnap = await getDoc(doc(getFirestore(), path));
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  }

  // Crear un nuevo documento en una colección (por ejemplo, Asignaturas)
  async addDocumentToCollection(collectionPath: string, data: any) {
    const docRef = await addDoc(collection(getFirestore(), collectionPath), data);
    return docRef;
  }

  // Obtener documentos de una colección (por ejemplo, obtener todas las asignaturas)
  async getCollection(collectionPath: string) {
    const q = query(collection(getFirestore(), collectionPath));
    const querySnapshot = await getDocs(q);
    let documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;
  }

  // Obtener un documento por ID de una colección (ej. Obtener una asignatura por su ID)
  async getDocumentById(collectionPath: string, id: string) {
    const docRef = doc(getFirestore(), collectionPath, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      throw new Error("No such document!");
    }
  }

  // Obtener documentos filtrados (ej. filtrar por role o status)
  async getFilteredDocuments(collectionPath: string, field: string, value: string) {
    const q = query(collection(getFirestore(), collectionPath), where(field, "==", value));
    const querySnapshot = await getDocs(q);
    let documents: any[] = [];
    querySnapshot.forEach((doc) => {
      documents.push({ ...doc.data(), id: doc.id });
    });
    return documents;

    
  }

   // Método para obtener las asignaturas de Firestore
   getAsignaturas() {
    return this.firestore.collection('asignaturas').valueChanges();
  }

  deleteAsignatura(asignaturaId: string): Promise<void> {
    const path = `asignaturas/${asignaturaId}`;
    return this.firestore.doc(path).delete();
  }
  
}
