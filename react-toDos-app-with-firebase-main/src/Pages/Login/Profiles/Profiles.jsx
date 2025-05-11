import React, { useContext, useRef, useState } from "react";  
import styled from "styled-components";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import { AiOutlineLogout, AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { auth, updateProfile } from '../../../Firebase/Firebase.config';
import { AuthContext } from '../../../App';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../Firebase/FirebaseStorage.config";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from "firebase/auth";
import toast
 from "react-hot-toast";
const Profiles = () => {
  const navigate = useNavigate();
  const user = auth.currentUser;
  const { loading, setIsAuth } = useContext(AuthContext);
  const [editingField, setEditingField] = useState(null);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const fileInputRef = useRef(null);

  const handleLogOut = () => {
    auth.signOut().then(() => {
      setIsAuth(false);
      navigate("/login");
    });
  };

  const handleSave = async (field) => {
    try {
        if (field === "displayName") {
        await updateProfile(user, { displayName });
        setEditingField(null);
        window.location.reload();
        }

        if (field === "password") {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);

        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);
        toast.success("Password updated successfully.");
        setEditingField(null);
        setOldPassword("");
        setNewPassword("");
        }
    } catch (error) {
        console.error("Update failed:", error);
        toast.error("Old password is incorrect or another error occurred.");
    }
   };


    const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  console.log(file)
  if (!file) return;

  const storageRef = ref(storage, `profile/${user.uid}.png`);
  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await updateProfile(user, { photoURL: downloadURL });
    await auth.currentUser.reload();
    toast.success("Profile picture updated!");
    window.location.reload();

  } catch (error) {
    console.error("Error uploading image:", error);
    toast.error("Failed to upload image.");
  }
};


  return (
    <ProfileContainer>
      <div className="title">
        <h3>
          ToDos By{' '}
          <span className={`${!user?.emailVerified ? 'text-danger' : 'colorize'}`}>
            {user?.displayName || 'User'}
            {user?.emailVerified ? (
              <span className="cursor-pointer" title="Verified.">
                <MdVerified />
              </span>
            ) : (
              <span className="cursor-pointer text-danger" title="Unverified.">
                <GoUnverified />
              </span>
            )}
          </span>
        </h3>
        <div className="action">
          <img
            width={50}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/profile")}
            src={
              loading
                ? "https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/white-loader.gif"
                : user?.photoURL
            }
            alt={user?.displayName}
          />
          <span
            onClick={handleLogOut}
            className="cursor-pointer text-danger d-flex"
          >
            <AiOutlineLogout /> Log out
          </span>
        </div>
      </div>

      <div className="profile-box">
        <div className="avatar-wrapper" onClick={() => fileInputRef.current.click()}>
          <img
            className="profile-avatar"
            src={
              loading
                ? "https://www.commpartners.com/wp-content/plugins/wp-meta-seo/assets/images/white-loader.gif"
                : user?.photoURL
            }
            alt={user?.displayName}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleImageUpload}
          />
        </div>
        <h2 className="colorize">{user?.displayName || "User"}'s Profile</h2>
        {user ? (
          <div className="info">
            <p>
              <strong>Email:</strong>
                {user.email}
            </p>

            <p>
              <strong>UID:</strong> {user.uid}
            </p>

            <p>
              <strong>Name:</strong>
              {editingField === "displayName" ? (
                <>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  <button className="btn-inline" onClick={() => handleSave("displayName")}>Save</button>
                </>
              ) : (
                <>
                  {user.displayName || "Not Set"}
                  <AiOutlineEdit className="edit-icon" onClick={() => {
                    setEditingField("displayName");
                    setDisplayName(user.displayName || "");
                  }} />
                </>
              )}
            </p>

            <p>
              <strong>Password:</strong>
              {editingField === "password" ? (
                <div className="password-alert">
                  <label>
                    Old Password:
                    <input
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </label>
                  <label>
                    New Password:
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </label>
                  <button className="btn-inline" onClick={() => handleSave("password")}>Save</button>
                </div>
              ) : (
                <>
                  ********
                  <AiOutlineEdit className="edit-icon" onClick={() => {
                    setEditingField("password");
                    setOldPassword("");
                    setNewPassword("");
                  }} />
                </>
              )}
            </p>
          </div>
        ) : (
          <p>No user is logged in.</p>
        )}
      </div>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  padding: 2rem;
  color: var(--accent-color);

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--secondary-color-alt);
    padding: 0.5rem 1rem;
    border-radius: 5px;

    h3 {
      margin: 0;
    }

    .action {
      display: flex;
      gap: 1rem;

      img {
        border-radius: 50%;
      }
    }
  }

  .profile-box {
    background: var(--secondary-color-alt);
    margin: 2rem auto;
    max-width: 500px;
    padding: 2rem;
    border-radius: 10px;
    text-align: center;

    .avatar-wrapper {
      margin-bottom: 1rem;
      display: flex;
      justify-content: center;
      cursor: pointer;
    }

    .profile-avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      border: 4px solid var(--accent-color);
      object-fit: cover;
    }

    h2 {
      margin-bottom: 1.5rem;
      color: var(--primary-color);
    }

    .info {
      font-size: 1rem;
      text-align: left;

      p {
        margin: 0.7rem 0;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      input {
        margin-left: 0.5rem;
        padding: 0.3rem;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

      .btn-inline {
        padding: 0.3rem 0.8rem;
        background-color: #39ad48;
        color: #ffffff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: bold;
      }

      .edit-icon {
        cursor: pointer;
        font-size: 1.1rem;
        color: var(--accent-color);
      }

      .password-alert {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-top: 0.5rem;

        label {
          display: flex;
          flex-direction: column;
          font-weight: bold;
        }
      }
    }
  }
`;

export default Profiles;
