"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { useFavorites } from "../../context/FavoritesContext";
import EditableProfileImage from "../components/profile/EditImage";
import EditableName from "../components/profile/EditName";
import Menu from "../components/profile/Menu2";
import "../../../src/globals.css";

export default function Profile() {
  const [name, setName] = useState("Usuario");
  const [profileImage, setProfileImage] = useState("/default-profile.png");
  const { favorites } = useFavorites();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setName(user.displayName || "Usuario");
        setProfileImage(user.photoURL || "/default-profile.png");
      } else {
        setName("Usuario");
        setProfileImage("/default-profile.png");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    if (auth.currentUser) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profileImage,
        });
        console.log("Perfil actualizado en Firebase");
      } catch (error) {
        console.error("Error actualizando el perfil:", error);
      }
    }
  };

  return (
    <>
      <div className="background-blur"></div>
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg bg-black/20 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden relative">
          <div className="p-8 w-full">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-white">Perfil</h1>
              <button
                onClick={handleSave}
                className="text-white hover:underline focus:outline-none"
              >
                Guardar Cambios
              </button>
            </div>
            <div className="flex flex-col items-center mb-6">
              <EditableProfileImage image={profileImage} setImage={setProfileImage} />
              <EditableName name={name} setName={setName} />
            </div>
            <Menu />
          </div>
        </div>
      </div>
    </>
  );
}
