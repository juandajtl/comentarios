import React, { useState } from "react";
import swal from "sweetalert";
import "./DoctorCard.css";

const defaultPhoto =
  "https://res.cloudinary.com/dexfjrgyw/image/upload/v1683852209/Fresh_Smile_Cmills/cards4_r5phfs.jpg";

export const DoctorCard = ({ name, specialty, photo }) => {
  const [cards, setCards] = useState([
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
    },
    {
      rating: 0,
      hoverRating: 0,
      comment: "",
      submitted: false,
      isEditing: true,
    },
  ]);

  const [selectedRatings, setSelectedRatings] = useState({});
  const [comments, setComments] = useState([]);

  const handleRatingClick = (index, value) => {
    setSelectedRatings((prevRatings) => ({
      ...prevRatings,
      [index]: value,
    }));
  };

  const handleRatingHover = (index, value) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index].hoverRating = value;
      return newCards;
    });
  };

  const handleRatingLeave = (index) => {
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index].hoverRating = 0;
      return newCards;
    });
  };

  const handleCommentChange = (index, event) => {
    const { value } = event.target;
    setCards((prevCards) => {
      const newCards = [...prevCards];
      newCards[index].comment = value;
      return newCards;
    });
  };

  const handleSubmit = (index) => {
    const selectedRating = selectedRatings[index];
    const comment = cards[index].comment.trim();

    if (selectedRating && selectedRating !== 0 && comment !== "") {
      setCards((prevCards) => {
        const newCards = [...prevCards];
        newCards[index].rating = selectedRating;
        newCards[index].comment = comment;
        newCards[index].submitted = true;
        newCards[index].isEditing = false;
        return newCards;
      });

      setComments((prevComments) => [
        ...prevComments,
        { name, specialty, rating: selectedRating, comment },
      ]);
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

  return (
    <div className="doctor-card-container">
      {cards.map((card, index) => (
        <div className="doctor-card" key={index}>
          <div className="doctor-details">
            {/* <h2>{name}</h2> */}
            <p className="descripcion">Especialidad: {specialty}</p>
          </div>
          <img src={photo || defaultPhoto} alt={name} />
          <div className="doctor-rating">
            <h3>Valoración:</h3>
            {card.submitted ? (
              <p className="valoracion"> </p>
            ) : (
              <div className="star-rating">
                {["★", "★★", "★★★", "★★★★", "★★★★★"].map((value) => (
                  <span
                    key={value}
                    className={`star ${
                      value <= (card.hoverRating || selectedRatings[index])
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
            <button onClick={() => handleSubmit(index)}>Enviar</button>
            {card.submitted && (
              <div className="comment">
                <p>{name}</p>
                {/* <p>Especialidad: {specialty}</p> */}
                <p>Valoración: {card.rating}</p>
                <p>Comentario: {card.comment}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
