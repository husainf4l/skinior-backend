interface FirestoreUser {
    id: string;
    UserName?: string; // Use `?` if this field may be optional
    email?: string;
    phone?: string;
    version?: string
    // Add other fields from your Firestore documents
}
