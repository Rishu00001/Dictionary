const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try{
    result.style.display = "block"
    result.innerHTML = "Fetching..."
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();
    let definitions = data[0].meanings[0].definitions[0];
    result.innerHTML = `
      <h2><strong>Word:</strong> ${data[0].word}</h2>
      <p class = "partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definitions.definition || "Not Found"}</p>
        <p><strong>Example:</strong> ${definitions.example || "Not Found"}</p>
         <p><strong>Antonyms:</strong>
      `;
      if(definitions.antonyms.length === 0){
          result.innerHTML += "Not Found"
      }
      else{
          for(let i = 0; i< definitions.antonyms.length; i++){
              result.innerHTML += `<li>${definitions.antonyms[i]}</li>`
          }
      }
    result.innerHTML += `<div><a href = "${data[0].sourceUrls}" target = "_blank">Read more</a></div>`
  }catch(error){
    result.innerHTML = `<p>Can't fetch word</p>`
  } 
};
