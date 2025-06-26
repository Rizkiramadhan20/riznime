import { useRef, useState } from "react";
import { useAuth } from "@/utils/context/AuthContext";
import toast from "react-hot-toast";
import imagekitInstance from "@/utils/imagekit/Imagekit";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";

function getValidDate(dateValue: unknown): Date | null {
  if (!dateValue) return null;
  if (
    typeof dateValue === "object" &&
    dateValue !== null &&
    "seconds" in dateValue
  ) {
    // @ts-expect-error Firestore Timestamp object has 'seconds' property
    return new Date(dateValue.seconds * 1000);
  }
  const d = new Date(dateValue as string | number | Date);
  return isNaN(d.getTime()) ? null : d;
}

export function useManagementProfile() {
  const { user, changePassword, logout } = useAuth();

  const dateCreated = getValidDate(user?.createdAt);
  const dateUpdated = getValidDate(user?.updatedAt);

  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });
  const [formError, setFormError] = useState<{
    displayName?: string;
    phoneNumber?: string;
  }>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isPasswordLoading, setIsPasswordLoading] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }
    try {
      setIsUploading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        const uploadResponse = await imagekitInstance.upload({
          file: base64Image,
          fileName: `profile-${user.uid}-${Date.now()}`,
          folder: "/profile-images",
        });
        if (uploadResponse.url) {
          const userRef = doc(
            db,
            process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string,
            user.uid
          );
          await updateDoc(userRef, {
            photoURL: uploadResponse.url,
            updatedAt: new Date(),
          });
          if (user) {
            user.photoURL = uploadResponse.url;
          }
          toast.success("Profile picture updated successfully");
        } else {
          throw new Error("No URL returned from upload");
        }
      };
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload profile picture"
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError({});
    if (!user?.uid) {
      toast.error("User not authenticated");
      return;
    }
    if (!formData.displayName.trim()) {
      setFormError({ displayName: "Nama wajib diisi" });
      return;
    }
    try {
      setIsEditProfileLoading(true);
      const userRef = doc(
        db,
        process.env.NEXT_PUBLIC_COLLECTIONS_ACCOUNTS as string,
        user.uid
      );
      await updateDoc(userRef, {
        displayName: formData.displayName,
        phoneNumber: formData.phoneNumber,
        updatedAt: new Date(),
      });
      if (user) {
        user.displayName = formData.displayName;
        user.phoneNumber = formData.phoneNumber;
      }
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch {
      toast.error("Failed to update profile");
    } finally {
      setIsEditProfileLoading(false);
    }
  };

  const handlePasswordInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenPasswordModal = () => {
    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordError({});
    setShowPasswordModal(true);
  };

  const handleClosePasswordModal = () => {
    setShowPasswordModal(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError({});
    if (!passwordForm.oldPassword) {
      setPasswordError({ oldPassword: "Password lama wajib diisi" });
      return;
    }
    if (!passwordForm.newPassword) {
      setPasswordError({ newPassword: "Password baru wajib diisi" });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError({ newPassword: "Password minimal 6 karakter" });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError({ confirmPassword: "Konfirmasi password tidak cocok" });
      return;
    }
    try {
      setIsPasswordLoading(true);
      await changePassword(passwordForm.oldPassword, passwordForm.newPassword);
      setShowPasswordModal(false);
      await logout();
    } catch {
      // Error toast already shown in context
    } finally {
      setIsPasswordLoading(false);
    }
  };

  const togglePasswordVisibility = (
    field: "oldPassword" | "newPassword" | "confirmPassword"
  ) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return {
    user,
    dateCreated,
    dateUpdated,
    isEditing,
    setIsEditing,
    isUploading,
    setIsUploading,
    fileInputRef,
    formData,
    setFormData,
    formError,
    setFormError,
    showPasswordModal,
    setShowPasswordModal,
    passwordForm,
    setPasswordForm,
    passwordError,
    setPasswordError,
    isPasswordLoading,
    setIsPasswordLoading,
    isEditProfileLoading,
    setIsEditProfileLoading,
    showPassword,
    setShowPassword,
    handleInputChange,
    handleImageUpload,
    handleFileChange,
    handleSubmit,
    handlePasswordInputChange,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handlePasswordSubmit,
    togglePasswordVisibility,
  };
}
