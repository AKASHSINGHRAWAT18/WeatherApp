const temparateField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");
const imageField = document.querySelector(".weather3 p img");
const conditionField = document.querySelector(".weather3 span");
const searchField = document.querySelector(".searchfield");
const form = document.querySelector("form");

let target = "delhi";

const fetchdata = async (target) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=db8b8de4232445f5be9165012231809&q=${target}`;

  const reponse = await fetch(url);
  const data = await reponse.json();

  const {
    current: {
      temp_c,
      condition: { text, icon },
    },
    location: { name,localtime},
  } = data;
  updatedom(temp_c, name, text, icon,localtime);
  } catch (error) {
     alert("Loction not Found");
  }
};

function updatedom(temperate, location, condition, img,localtime) {
  temparateField.innerText = temperate;
  cityField.innerText = location;
  conditionField.innerText = condition;
  imageField.src = img;
  const edate=localtime.split(" ")[0];
  const etime=localtime.split(" ")[1];
  const exactDay=getDayFull(new Date(edate).getDay());
  dateField.innerText=etime+" - "+exactDay+" "+edate;

}

function getDayFull(day_in_number){
    switch(day_in_number){
        case 0:
            return "sunday";
        case 1:
                return "monday";        
       case 2:
            return "tuesday";
        case 3:
            return "wednesday";
        case 4:
            return "thusday";
        case 5:
            return "friday";
        case 6:
            return "saturday";
        default:
            return "dont know";
     };
}

fetchdata(target);


form.addEventListener(("submit"),(e)=>{
    e.preventDefault();
    target=searchField.value;
    fetchdata(target);
})
