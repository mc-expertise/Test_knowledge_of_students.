import "./styles.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import he from "he";
import "@fortawesome/fontawesome-free/css/all.css";
export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState();
  const [userAnswers, setUserAnswers] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=5")
      .then((response) => {
        setQuestions(response.data.results);
        setCurrentQuestion(0);
        setUserAnswers([]);
        setCheckedValues([]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [showResult, setShowResult] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleNextQuestion = (e) => {
    if (checkedValues.length === 0 && !selectedAnswer) {
      alert("Please select an answer before moving to the next question.");
      return;
    }

    if (selectedAnswer) {
      setUserAnswers([...userAnswers, selectedAnswer]);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setCheckedValues([]);
    } else {
      setShowResult(true);

      setShowQuestions(false);
    }
  };

  const handlePre = () => {
    if (currentQuestion === 0) {
      alert("test");
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  console.log("click:", userAnswers);
  // console.log("checkedValues:", checkedValues.length);
  // console.log("incorrect", incorrect);
  //  console.log("shuffledAnswers", shuffledAnswers);
  // console.log("answers", answers);
  // console.log("reponses:", shuffledAnswers);

  const renderQuestion = (question, index) => {
    let difficultyClass = "";

    if (question.difficulty === "easy") {
      difficultyClass = "easy";
    } else if (question.difficulty === "medium") {
      difficultyClass = "medium";
    } else if (question.difficulty === "hard") {
      difficultyClass = "hard";
    }

    return (
      <div key={index}>
        <p>
          Question {currentQuestion} of {questions.length}
        </p>
        <div className="section">
          <div className="logo_section">
            <img
              className="logo"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhIAAABfCAMAAACKut4WAAAAwFBMVEX///85wdUFKS0GKS0AJysAISYAHCEAERgAJCgAGh8AFRuvubsAIyf2+PgAHiMAChJ7hIbMz9BQZGYAAA3p7OyJlZZZZWfU1tc6UVTDy8ufq6xXbG9CWFsrQUQAAAAiPEAINDjt8PD0/P3X8fa6wsNExNfc4eLL7fOUn6F+jY9reHlDxNd0hYdOXF7q+Ppx0N+e3eikrq+H2ORlzd2l3+k0SEu86fCA1uMUMTUqPkEQOT2y5u7Q8PU8VFe1u7xwenvQB7snAAAW4klEQVR4nO1daXuiOhRWGlZZxq2oaKmtUmRsp7Zj6+1M7f//VxckCVlRtKP3Tn2ffqlAEsjLycnZqNUq4ebu6bk+fX68u6l23Rl/K3491yF+3J16LGf8B3DzVCfwdOrhnHF6vNbrZ06cQeBnncHLqUd0xmnxMGUp8fxw6jGdcVI8soyo13+dekxnnBSckEjFxKnHdMYpccMzol4/9aDOOCVuRZQ4KxNfGb/PlDiDxsN54TiDwfezevnVcZMD///KU+Lx8F4cGoc3eMBQxuOT9v8fx+2vp2kmFr4/P75AVvD65fcDVYnm/NtHMBwOW73rHMtW0l00+tHh46+OKHnz7OHgFF3/H3D3g1wlptBw/cRS4ueB3TSuNFe1bVs1QA5DdU3LVcLlvD8++CaqwR+ZxgWwrdmR+/1/4PYHO/e5I/yGMVYdrEk09AsRUmq43tu3yVGleOjmfeuLY/b6PwHn3arXX/MjD8/kjz8O3oFKKLGBoRnLxfFExcRTYL/h0fr830CgRdan8NgDsXY8HR5XVUaJ9IU19HBxLEnRNVGvmqTL06q+p4SIEfUf+PDt63OqZkyfn24/oa9ySmxExfuRBEWMKeGKenSi2bJ/nJH85yBwd9Zpj+fN7d3d7edEXhKUUKCCyXBC0ZbH2X7goYBr/uB4EWgW+KKUuBMyYvqH7NbFPFgGWIVhuFLSDYdBkUK97vyZzmk4sFvF6rJHmsnKdQFQviYlaP1RsG58LhAlwGjR7/sZ+pM4CT3dJaSF2zrKIr6wbCXj5pBdNxpXLlAU5atSQrxs1P9UMDaihN2ifnYmH6Gr4LXjSKaCyVLTvVXA8W9gKcoXpoSYEXWx5vDy9Pp42IqCKKFygsBPPLx+AP046kRnsl77/M9fmxK/xIwQezJyifJ6CCnklEiPhZgT2scBfRyMr00J4QZUsm4gj8f0AKt2GSVqPtYzQXgSpwfE16aEWJWYCk0QBX1+7L0jLaVErblCSqbe2LeHT8DXpoQwcKr+XUgJ4oS9LdvllKjNNLQRDfbs4DPwtSkhcm/UxVldL+QJ+8qJLZQYm1BMALBf+5+CL06J2q1QnRBkddHn7ZkKuIUStaEKKWGe0L/w1SmR4uWVT9iY/mLWhlsm6m6/VMBtlFhY0DRh8ptDJ2ou4iQI5vGkGW1jTMfvD+JuN15vP1UwCEiJ5o4XdPxmnKHf9LcbXtPbWGe3Eczivl9lcFFzMA+CRHhL6bFZeqw72TKAcdRsxHE3Xmwd6cOLgBSv1Kyz29XnvZaObZRo6ogS7BsadS9DXbdc19Us3Qov47I9SSPpKZ5lmaala+HlbEIfHXx8I/BBhEs4SfbLva3kuJScRmEcJz2gWxk87Xr4Ue7Kbaa3Yeqmu7kPTw0vuzLeRdkoP/DQ+0moW1p6WXr3o8uYtLg6cRKaVtamqavDucDSAuHPhm/p5eljsfTr92SwhRUvHCdSvP7GE89xZq+t6DZK+NANppj0NK6XV6YKCvsmUM32UhJxM+6aumuA4lTNa7fWxe07ie4S8L4VlzpX2S+IEYpKniY2lfSDKyvtDF4AgO3qXks2y35XaWe3gQHS+/CuxUEizWwsVi8/5o8818CXGarVnqNXIprpuovbBLbW7onflkl4pdnEia51FZa+WHxQXS4MoLmSV0OZCKvbx6df2wXHNkpE13AqKSnRSVz1goOqBiKa94cW6129UFS9N0N37yQueUyjKKHI4M4FfXW+qa7gVBCInnQ0X5mAP1sxrKHoxW562UFzExo6WKnsVWaYvzSLEdeoGwok2ngOuDYUQw+DEoXptyBEP5/7X3d3IucYZc/K15Wt5u6tUkJBUoJ40xqey03yRgd1NT6Wdn0lYE/aoH31+ZRYaMI5VoBrxuz9OfGVJjw5harHfOM5JbL4HidpC640zG52L54hONTmOOGHlnioXok/6VaQFFwKcuVAyud0i79sKyWwelm8ZzEXU1GQwmI5sVYkJxsh6vHTKDFTZXOsAGvO3GDTlZ6cnc5zIqdEJibm4kuBnh6ScNJY0411egJptoFXIiXEgRMlIG0ThRX0Vd5DbTslsPPcwj91rwq1wHBTJc4sFIULoNMk7xS+s/RsW7UNpIAUURGllNhE9eAnS0BjKTEOPOLEtC/VBsT86KyHNSEmBbZJ/GBy7zWkhNGb5/0AQ7XT2yEvWiXw37T77BhJF3rpCkyi73SouB1gl8yWWJcoARFmc0MsLKURmtsoEcDZAgr6ZYAXDeAao2SwWHSD0NYwTej46jkyf14YrhG+t4bhhbo5FxhYX02FrZlBEVCinU0UflxKGSWGGnrIhmZfLNO+eivgFi+0zsiJZhu2qpqunecraMXqbqxYHRNSQslVAEMDYWs4DIFKiAyQa4uGC8L34fsIuEV7bkL2PrHwJa59sRmqYar5efLJupGpElIQaT5UDlBZ+M02SiDrpYriKfpIRijuqouZ35wBpDEAMhzOx04S9w0q0856lmp1F0aveOTr7gYwQIOkRC3qpIhNyIhGp0BET1m6bUEP2RrFfXg30SIx8bSwi0HL3YgD8767mPhpi81Jt6VjTcBk5wZRYtOHFnZzVbqzTlRbIQHM5SC/1U4j0PHeRyMXhABJKKAm8Pdm3PLShqySdUO4CS1HQQlawpQkCW6hRMNCYh4+zmgJFwLFpNVyv4ekv03E3C9QHJ/aIgRnNFdcwdvQFlBig12slzF6WW2DthH0h0iLBCYtvPupZHCVmU+c7kxGeLJWzLaDoAQwyS1MMyT1AsOcEfvrBV5YyBuORgaSEYSO4TSWploW6Mol91SgBJsBJLdsllNijO3ZKhxpgtRNNWEuGN+jCGtCXUdaghHS73SUXDHmqtphlPCv4KM3h9wz7SLdng0YTEx9xp7daaH5ZYVKQQmDUTQ69wUnjBXtM+4jBYf0Ek2gHgwA42Dulq0bfKWyCpRgJYw8KaycEnMNCgkVxkP6KP1GEI4ZDW04/z38mqAgHE6Bd2LeHHQAJZyWimZdYBrpQjkBbLqBpilw+Y+XsCljSR/AlACApXOELU5AZ8c405BAKK5aQ1XCHrK9N9fsLwUk4VVlKHQJznMmLXJWSomujsyTJtweBPitFzz5pgpYArzBX7xdInAOoMQAKhLqSGh4TKB+rzJTIDQ195FQadP3iNVLnZ+2LtpAuGx0ebrdhKqGVrwWscUvJtshDtQuBfZy8KVJpA6QEkqMAxXvLfT86TSR4UpgkkqRwO2FcY1+QZRo/2FKKFAMKGJ/Qget3e0d0g+cAIoJJmwIUcIVhI5MoMpACEgMJCaI+xrsQwlhwZktwFqkIOZCZrGSUmI8CDXswkDGhhlUF1iZCoEcIhdtZOpEyihnwRJhf0osdO5FpBHDadlpHA1ICY02sSBKeALaRWFOCfWSP4auUwvDSAOO177fYTgIkth9BtMpqXFgJVIgYWSbjiJov5C4jjOOZkutyO+xEfeRSUryZNP3i15n8ELDL5oC7E0J5zKfRLCSOT3HK7D7a+mvhPNbRgkkhkSUqEH7h/2OJcgabo+4XU0JbnZZN77/fHi4fcFnTtHiwEZSZJApmNg6uQrms8Gi0VjEs6R17WkGFhEXAL30zTb8QZHI3wEULOolnJs1al7lNxgc9qaED9cNznpVYJiTxhYIdg7O0hC9w3tT4ppbVJBQ2UJRarXfyZgNS048PG5Y8R2vDcJYPUmvRQKg6mqW5bqWpbk25ZYALhLHKLfbZTegCD7UPnBANzZVGW/bw1/2pgRami35OwetXcZoF6UGKoR2j9JV96bEm8HpGUhd4X1CBW6fnl9/ykxNYhAv/t3jU+HzFEsYiX7JZI4rygULcIVHDZcBRZPWBLFZv2mC43mvt8qJvSnxrsL5louAdb56AyBl5jjqNyf9TUUmOGGMrrg3JVp8c33kzgPuTPJ63W1k/fT5JZ9YcZw2A5n9SVgwtS6pPLC1mIC7wvPfec8ND0Cewd2DpgmsrPvY+WEYwZYotr0pAa3GdqvjjMVw0HxywWEZnKiRvP8TXqQ6xEW4TCZwDkFITf7elBAwDNtRFKC9iyOPsJb4/enl4fbnLu4NaS65ODtoL0ooht4rHkC6AuaUWEmlL7JWFsp6jEzi6QKE7fli7EuJDnzlQDiUogd3oR4vq6I4sHTXxsW6XB1J9T9HiVq0ws4U1RsOeFJQL/aOZktZSLbE7LkPJVR3SQYuIquE8Y+k62KXSqR9zIsegGsMJ/ICJvtSYoIdXrYUaAI4SnTmK00SZvEnKVFrgCLUxnZHXXbNEydvlIO2NDz8gmuObPu6TZdQKDUiK2xneb0GNX99uJ8wRuK2akVAt9HDPzmBXmirwPaGUkVkX0oMLGVnsPbmWBxr9+cpUWu4hAPVsELG2yLJBC0F1cDGqfF89/DwIDNoCB9mQQkFqJZuamoG19TB6D6JWeJOvPxcpvAAiQGixBvxY2zblOgZSWqi7UuJrqnsCka9jFqWICzuOJSo9WkHqnaREMd3skIwoNYNVKdkKm1IFjOBKGG8TybreB60UszjdV+kCU6wpVPSWOEMpyhRa7xZRF2bVEEZCncf+1Jipim7grYNNcPiSkPVdM9re3oWT3MUStSi4IoMyAXmqnCQ7OP1pHQDUWzF9ymppMr8Xo3t04yxAyWanogSNac7oqK0bTMRCIp9KfENvW22uQ06OS2TFRbdhjW6nK2bzY4/iZNLaL3805RIRzA0SSkFzB66wz0oQfuxRLW1b9OdS7GRkVW/2xZVRd3AdkoIF44M0Vw3CUkBtCFvQziUEkbQ3QpCkfFxNJThLRfkSj53j0SJ2njx5pHKrYrCDyX1qcpA5fEIvuYDj98+5U3v5xxncAgl0qfWXRJ6puL+w+1k96YEFP9uperbEYqL4NMsoHJyBEqkWLTIQD0jzxOp3VSPoKKEBB9bUVg2H+5emcxBCpUoAU0MZboEooTIVRoNrvVCUqg9du04VL00ZX5QIRKkR5hcIs9RKVFzJj1CpwB6LicqU4L2YvFCZudkwCqUaIKtdok5NFXJylEMlibe65rsOftSAgWkmFz4SgmwSVnj7/y4lMiaviyyjIzcP7SbK5wA9doLPJ87VyCpQgkfWS/llGhB77gmS1mKCisFlwi+LyVQ9IFbpaAWyuJQBRN1dErUnIGOBYW58eeKfRolSudvsj2eUOXpPCSqUAJFZ5cYtFFqV0kdowWO1WLDk/alBJqrnTzfEMifDgzBBB+fEunD7WFOXG2mQjDrr+mWQSo9KCnBrxu7f0+2CiVql7kM4MNREcYGCsQrcYUPECeIDLIN9nZ7IR8H2L3GWgOFuon0olNQohZdIy0zT47i5x5qA7+fhLuRKdkYJ00qVFeuRAmYuiWJvEwxcZHJu2xyulAHvWAcDlspIaMiiqzUd99yoNwaS8Tdk1AicyGRCyC3cuAQqXTLICIFWeySC66oUF25EiWQbVIaQoOqneGoKiE6KEiX0Qe3UsKWUGIONw87hfPlgFMoDrE4DSVqH0i9yZ8eKyaoWMmbX4ItyesdYgVn1vjN9SZFJUo4KNBOUme9g6Jvt+j+iDlMYNw2SiimJMnBR5ky7s7FrGCkk83V685wIko0kMltuTmRtTax1sZbgbMUf5HjgZYT0woliipRovaOImTE3sw1io1ol0fVIYPWrpRAWwpBhv8GOFVCKr44wHhIlS/YXTsZJVCCkAGTAO+onaSgZqHQxPn9JzzxhZAjVSoUVaMEShE1RqKzHQUKCYHtksKiIiWKsHdJg8gyoVi7fhYMSYmWSEocz6BNgaUEHTMhmlVx3jBydtwUkqLCulGREtEIfjJDFT36GMZTbFXzqi4cEUr7VySDHKOqMIZ8f0yjLFyzeTS3F42+ylCC4oRwyyCkBNY6sIe90lcBq1ECbxYMQQJCHyX2UPaBQcJNktNDKge9EEgp4UAxz+ZfkeOCYkIdiaO0fUbLgBrphSB3vw/gMvQnKeH3eFW5C7VkQjkvxIB4VsURmXiNQWKi0veFK1JiDOBsqlyVtmiEKkx4pJDo6SNWA0C+kgumBo+cEtjUKNQGs3G9Yx+WkBOT0TV9ZR9yiPfX9EMcKUuHHX8qJRY6+GCERqEREQ/gATm5SwvryyjxWHaxDBUpUVugrECX+fbaJESMcHvEz9HVhaGPqIA9fwVpxdbgkVIi6zWHRumPRKt9XNvDNrtc/ZigbTBfmYlCaMsw6UXOiYk4K1oz+dQI7aENNJOKrXNwrSKPlIU3ee6W+D2XBGjik5GCWan+ZVVKpAOHM6+uiNIa0QygYDqwIrcbm/hcW3vH4abOYoS8oWxylpwSOM1XMQM8If6cLGPSxTGUwO11O/hunHEjUFw+125uIlFAJlJMhmRlMjoX6zMpEWV7KKCFH03UuY/rWgCPuf7u50/xay6LxsNpf8iIWalMblVK1MYjVG0GmGawmEz8/mQRWCZ2ZrVJjnfyxA7Ftqz3eL1eD5LCP84lRMopkZU1QNOkD9OGBt2k1zbJPHFnVhQvMyxvmQzWWX/znq7nWhtjuu4gjRRYb92JH42zgKqlvpHdOHiaqoHwmZSAqgxw228fjXScs55X1E/a2aErWTdwDGYhRF7/mF0ig7/E9eeAaqkgTOdbxR7vIltwgz4+kgp03dKtomAm/8GwEkqMR0VEQdqQnlXRY+s6JWSstZHVMU7/iPKzHq2bznEQr2Gqq1FvGRomMmm+GwIx8YmUGC/x6mS46WPRiXg7VRBvJoE4J7AwS5FC5OluV1ZUp0TNJz4Et/m4KBHtD9q0LhlQ5QtJKOY922MJJWo+kfaAQZuunFhUoBQD6MwX7RKyziAwcJlB1fUnKLNbJd7YT6TERF6g0yhJbGXAlp9idUlGiDw/7vZt2T0oUYvu+QrI+TS7K0ZZE1fG3cgIvoJQGSVqC5XnBOtdb1zLY7VVN2C0TlLyEDCXzZrzDhd2oH3Dz+UTKYGr7/HDvC6pTMRAbKgqFFFeiDzvUEJ7L0rUxl1DUDE5C8ZnDNnOYNi2SSmChIltCUK0SylRmyhcPVnOSuoHlvD9A6re4x/1OGmzNEtP3GRT+G+QLoQT5BMp0Uw8YYFdw5KYVYQQrhsFI4Tm7h0+5dPw8kzIil+H9YOVadOz7KojQWqjs75Pz6RJATRDYKhJKZEPxRRTouYPNWYG7SvupMkSsOlbwDXDVkN4e92QOjlVJlCGyWSUL+8kJeD42iJK/KPmj1FICXdzjIrf8oPQZVgBVDMUFHWTQ0QJYrMqLkix3Wq1Vq83UIT+nxI046WnZ9lhdpYfZrWvk7XkdpqDnuVZrqoahmHbrtlWPsS50iYciixIz4nf2tYmIc1WNUv3vN6HgIOTb0rbcm077S09U7M8JVhIrdzRTPHyFLf0zKs34kMhne5b23RVjaCEm49PE1FiiR6joJNEyQ/SemPUSK6vsseSj1TT9eGi2oe8+Sjs7+RmVZxCuN227YwdiEqj2VzaacyC+wyXSeyXXe+Mm3Fyf99bLof3QdyUvQlwKGN5U040mG+6DOZxw5edOPbT3obL5TI7bxGV35ozmV/mLQ6YDLd00PPW/UcxWjQ+YTMljxE/Y+6aze2kI+3dX84aJfctBmeWoL6rIMjkyDCVNncKOJ2jfM4eotOpIoRPib1H+vBE7DmemQ9tSKpk7vkNuDP+L3i4+/njefr84+kXZ3YQJ4JI0/7O+OshqmFXrxK7f8bfBolH7Cwkvi7Els3dsznO+Nsg9oiddcsvDGFS2FmR+MoQWTZLv+h1xt8OXrucnvWIrw3uy3A/znuNr46HV4IU06cqiRxn/K24fXl6ntanz8+Pd7unjZ/xX8W/Z/ghvPpECuMAAAAASUVORK5CYII="
              alt="logo"
            />
          </div>
          <div className="questions">
            <h4>{he.decode(question.question)} </h4>

            <span className={difficultyClass}>{question.difficulty}</span>
          </div>
          <div className="sections_reponses">
            {question.type === "multiple" ? (
              <p className="typeofquestion_mul">
                <span></span>
                Select Multiple Options
              </p>
            ) : (
              <p className="typeofquestion_bo">
                <span></span>
                Select One
              </p>
            )}
            {question.type === "multiple"
              ? question.incorrect_answers
                  .concat(question.correct_answer)
                  .sort()
                  .map((answer, index) => (
                    <label key={index} className="checkbox">
                      <input
                        type="checkbox"
                        name="answer"
                        value={answer}
                        required
                        checked={userAnswers.includes(answer)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserAnswers([...userAnswers, e.target.value]);
                            setCheckedValues([
                              ...checkedValues,
                              e.target.value
                            ]);
                          } else {
                            setUserAnswers(
                              userAnswers.filter((a) => a !== e.target.value)
                            );
                            setCheckedValues(
                              checkedValues.filter((a) => a !== e.target.value)
                            );
                          }
                        }}
                      />
                      {he.decode(answer)}
                      <span></span>
                    </label>
                  ))
              : question.incorrect_answers
                  .concat(question.correct_answer)
                  .sort()
                  .map((answer, index) => (
                    <label key={index} className="radio">
                      <input
                        type="radio"
                        name={index}
                        value={answer}
                        required
                        checked={selectedAnswer === answer}
                        onChange={(e) => setSelectedAnswer(e.target.value)}
                      />
                      {he.decode(answer)}
                      <span></span>
                    </label>
                  ))}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      {showQuestions && questions.length > 0 ? (
        <>
          <form className="face">
            {renderQuestion(questions[currentQuestion], currentQuestion)}
            {currentQuestion === questions.length - 1 ? (
              <button
                type="button"
                className="btn btn_grn"
                onClick={handleNextQuestion}
              >
                SUBMIT YOUR ANSWERS
              </button>
            ) : (
              <div className="btn2">
                <button
                  type="button"
                  className="btn "
                  onClick={() => handleNextQuestion()}
                >
                  NEXT QUESTION
                </button>
                {currentQuestion === 0 ? (
                  ""
                ) : (
                  <button className="btn" onClick={() => handlePre()}>
                    Prev
                  </button>
                )}
              </div>
            )}
          </form>
        </>
      ) : (
        ""
      )}
      {showResult &&
        questions.map((question, index) => (
          <div key={index} className="showResult">
            <div className="showResult_section">
              <div className="showResult_questions">
                <h4>
                  {index + 1}. {he.decode(question.question)}
                </h4>
                <span
                  className={`difficulty ${
                    question.difficulty === "easy"
                      ? "easy"
                      : question.difficulty === "medium"
                      ? "medium"
                      : "hard"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
              <div className="showResult_reponses">
                {question.type === "multiple"
                  ? question.incorrect_answers
                      .concat(question.correct_answer)
                      .sort()
                      .map((answer, index) => (
                        <label
                          key={index}
                          className={`res checkbox ${
                            answer === question.correct_answer ? "correct" : ""
                          } ${
                            userAnswers.includes(answer)
                              ? question.correct_answer === answer
                                ? "res checkbox correct_green"
                                : "res checkbox wrong"
                              : "res checkbox "
                          }`}
                        >
                          <input
                            type="checkbox"
                            id="checkboxRes"
                            name="answer"
                            value={answer}
                            disabled
                            checked={
                              answer === question.correct_answer
                                ? "checked"
                                : ""
                            }
                          />
                          {he.decode(answer)}
                          <span></span>
                        </label>
                      ))
                  : question.incorrect_answers
                      .concat(question.correct_answer)
                      .sort()
                      .map((answer, index) => (
                        <label
                          key={index}
                          className={`res radio ${
                            answer === question.correct_answer ? "correct" : ""
                          } ${
                            userAnswers.includes(answer)
                              ? question.correct_answer === answer
                                ? "res radio correct_green"
                                : "res radio wrong"
                              : " res radio"
                          }`}
                        >
                          <input
                            type="radio"
                            name="answer"
                            value={answer}
                            disabled
                            checked={
                              answer === question.correct_answer
                                ? "checked"
                                : ""
                            }
                          />
                          {he.decode(answer)}
                          <span></span>
                        </label>
                      ))}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
