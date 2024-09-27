import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser, deleteUser } from "../../core/services/userServices"; // Añadimos deleteUser
import { loadUser } from "../user/UserActions";
import { useEffect, useState } from "react";

const ProfileComponent = () => {
  const [profileInfo, setProfileInfo] = useState(undefined);
  const [profileInit, setProfileInit] = useState(undefined);
  const [newProfileModification, setNewProfileModification] = useState();

  const user = useSelector((state) => state.userReducer.user);
  const [isEditing, setIsEditing] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goHomePage = () => {
    navigate("/home");
  };

  // Handler para guardar cambios
  const saveHandler = async () => {
    setIsEditing(false);
    setProfileInit(profileInfo);
    // Actualizar usuario
    const saveAux = await updateUser(user._id, newProfileModification);

    dispatch(
      loadUser({
        user: saveAux,
      })
    );
  };

  const cancelHandler = () => {
    setIsEditing(false);
    setProfileInfo(profileInit);
  };

  const profileModificationHandler = (fieldName, fieldValue) => {
    setNewProfileModification({
      ...newProfileModification,
      [fieldName]: fieldValue,
    });
  };

  const load = async () => {
    const userAux = await getUserById(user._id);
    dispatch(
      loadUser({
        user: userAux,
      })
    );
  };

  useEffect(() => {
    load();
  }, []);

  // Handler para eliminar perfil
  const deleteHandler = async () => {
    try {
      await deleteUser(user._id); // Eliminar usuario
      navigate("/"); // Redirigir a la página de inicio tras la eliminación
    } catch (error) {
      console.error("Error deleting the user profile", error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={goHomePage}>Volver</button>
      </div>
      <div>
        <div>
          <h3 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
            Información sobre tu perfil
          </h3>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
            }}
          >
            <button
              style={{ fontWeight: "bold", textTransform: "uppercase" }}
              onClick={() => setIsEditing(true)}
            >
              Modificar perfil
            </button>
            <button
              onClick={goHomePage}
              style={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              Volver
            </button>
            <button
              onClick={deleteHandler} 
              style={{
                fontWeight: "bold",
                textTransform: "uppercase",
                backgroundColor: "red",
                color: "white",
              }}
            >
              Eliminar perfil
            </button>
          </div>
        </div>

        {isEditing && (
          <>
            <div
              style={{
                marginTop: 5,
                display: "flex",
                flexDirection: "row",
                gap: 5,
                justifyContent: "center",
              }}
            >
              <button onClick={saveHandler}>Guardar</button>
              <button onClick={cancelHandler}>Cancelar</button>
            </div>
          </>
        )}

        <div>
          {!user ? (
            <div>Loading...</div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
              }}
            >
              <div>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>Nombre: </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={user.firstName}
                    onChange={(e) =>
                      profileModificationHandler(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span style={{ color: "#CA5D35" }}> {user.firstName}</span>
                )}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>
                  Apellido:{" "}
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={user.lastName}
                    onChange={(e) =>
                      profileModificationHandler(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span style={{ color: "#CA5D35" }}> {user.lastName}</span>
                )}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>Email:</span>
                {isEditing ? (
                  <input
                    type="text"
                    name="email"
                    defaultValue={user.email}
                    onChange={(e) =>
                      profileModificationHandler(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span style={{ color: "#CA5D35" }}> {user.email}</span>
                )}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>
                  Fecha de nacimiento:
                </span>
                {isEditing ? (
                  <input
                    type="date"
                    name="birthdate"
                    defaultValue={user.birthdate}
                    onChange={(e) =>
                      profileModificationHandler(e.target.name, e.target.value)
                    }
                  />
                ) : (
                  <span style={{ color: "#CA5D35" }}> {user.birthdate}</span>
                )}
              </div>
              <div>
                <span style={{ fontWeight: "bold", fontSize: 24 }}>Id:</span>
                <span style={{ color: "#CA5D35" }}> {user._id}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
