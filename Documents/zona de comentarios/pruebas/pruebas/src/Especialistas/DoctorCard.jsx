import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";
import "./DoctorCard.css";

const defaultPhoto =
  "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852209/Fresh_Smile_Cmills/cards4_r5phfs.jpg";

export const CustomDoctorCard = ({ name, specialty, photo }) => {
  const [doctorCards, setDoctorCards] = useState([
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
      showAllComments: false,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
      showAllComments: false,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
      showAllComments: false,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
      showAllComments: false,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
      showAllComments: false,
    },
  ]);

  const [selectedRatings, setSelectedRatings] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  useEffect(() => {
    const savedComments = localStorage.getItem("comments");
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get("/FreshSmile/Especialistas/ConsultarComentarios");
      setComments(response.data);
      localStorage.setItem("comments", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleRatingClick = (index, value) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [index]: value,
    }));
  };

  const handleRatingHover = (index, value) => {
    setDoctorCards((prevDoctorCards) => {
      const newDoctorCards = [...prevDoctorCards];
      newDoctorCards[index].hoverRating = value;
      return newDoctorCards;
    });
  };

  const handleRatingLeave = (index) => {
    setDoctorCards((prevDoctorCards) => {
      const newDoctorCards = [...prevDoctorCards];
      newDoctorCards[index].hoverRating = 0;
      return newDoctorCards;
    });
  };

  const handleCommentChange = (index, event) => {
    const { value } = event.target;
    setDoctorCards((prevDoctorCards) => {
      const newDoctorCards = [...prevDoctorCards];
      newDoctorCards[index].comment = value;
      return newDoctorCards;
    });
  };

  const handleSubmit = async (index) => {
    const selectedRating = selectedRatings[index];
    const comment = doctorCards[index].comment.trim();

    if (selectedRating && selectedRating !== 0 && comment !== "") {
      try {
        const response = await axios.patch(`/FreshSmile/Especialistas/comentar/${index}`, {
          Valoracion: selectedRating,
          Comentario: comment
        });
        console.log(response.data);
        setDoctorCards((prevDoctorCards) => {
          const newDoctorCards = [...prevDoctorCards];
          newDoctorCards[index].rating = selectedRating;
          newDoctorCards[index].comment = comment;
          newDoctorCards[index].submitted = true;
          newDoctorCards[index].isEditing = false;
          return newDoctorCards;
        });

        fetchComments(); // Actualizar los comentarios después de agregar uno nuevo
      } catch (error) {
        console.log(error);
      }
    } else if (!selectedRating && !comment) {
      swal({
        timer: "2000",
        button: "Aceptar",
        icon: "warning",
        text: "No se ha seleccionado nada en valoración ni comentario.",
      });
    } else if (!selectedRating || selectedRating === 0) {
      swal({
        timer: "2000",
        button: "Aceptar",
        icon: "warning",
        text: "No se ha seleccionado ninguna valoración.",
      });
    } else {
      swal({
        timer: "2000",
        button: "Aceptar",
        icon: "warning",
        text: "No se ha llenado la zona de comentarios.",
      });
    }
  };

  const handleShowMoreComments = (index) => {
    setDoctorCards((prevDoctorCards) => {
      const newDoctorCards = [...prevDoctorCards];
      newDoctorCards[index].showAllComments = true;
      return newDoctorCards;
    });
  };

  const maxCommentsToShow = 2; // Número máximo de comentarios para mostrar inicialmente

  return (
    <div className="doctor-card-container11">
      {doctorCards.map((card, index) => {
        const filteredComments = comments.filter(
          (comment, commentIndex) => commentIndex < maxCommentsToShow
        );

        return (
          <div className="doctor-card11" key={index}>
            <div className="doctor-details11">
              <h3>{name}</h3>
            </div>
            <div className="doctor-photo-container11">
              <img src={photo || defaultPhoto} alt={name} />
              <div className="doctor-description">
                <p className="specialty">Descripcion: {specialty}</p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Aliquam et ultrices nulla. Sed auctor sapien vel lorem mollis,
                id facilisis neque ullamcorper. Proin efficitur est et ipsum
                elementum, sed tincidunt sapien cursus. Sed iaculis mi ac
                pharetra finibus. In pulvinar arcu ut tellus gravida convallis.
                Sed aliquet urna a sem commodo, in fringilla dui fermentum.
                Nulla facilisi. Proin nec tempor ex, vitae sagittis nunc.
              </div>
            </div>
            <div className="doctor-rating11">
              <h3>Valoración:</h3>
              {card.submitted ? (
                <p className="rating11">{card.rating}</p>
              ) : (
                <div className="star-rating11">
                  {["★", "★★", "★★★", "★★★★", "★★★★★"].map((value) => (
                    <span
                      key={value}
                      className={`star ${value <= (card.hoverRating || selectedRatings[index])
                          ? "selected"
                          : ""
                        }`}
                      onClick={() => handleRatingClick(index, value)}
                      onMouseEnter={() => handleRatingHover(index, value)}
                      onMouseLeave={() => handleRatingLeave(index)}
                    >
                      {value % 1 === 0.5 ? "★" : "★"}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="doctor-comments">
              <textarea
                value={card.comment}
                onChange={(event) => handleCommentChange(index, event)}
                disabled={!card.isEditing}
              ></textarea>
              <button className="ver_comentarios" onClick={() => handleSubmit(index)}>Enviar</button>
              {card.submitted && (
                <div className="comment">
                  <p>{name}</p>
                  <p>Valoración: {card.rating}</p>
                  <p>Comentario: {card.comment}</p>
                </div>
              )}
            </div>
            {card.submitted &&
              !card.showAllComments &&
              filteredComments.length > maxCommentsToShow && (
                <button className="ver_comentarios" onClick={() => handleShowMoreComments(index)}>
                  Ver más comentarios
                </button>
              )}
            {card.showAllComments &&
              comments.map((comment, commentIndex) => (
                <div key={commentIndex} className="comment">
                  <p>{comment.name}</p>
                  <p>Valoración: {comment.rating}</p>
                  <p>Comentario: {comment.comment}</p>
                </div>
              ))}
          </div>
        );
      })}
    </div>
  );
};
