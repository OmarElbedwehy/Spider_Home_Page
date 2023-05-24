// TIME AND DATE

console.log("Hello")

setInterval(() => {
    let date = new Date();

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let secounds = date.getSeconds()
    let dayNight = "AM";

    if (hours > 12) {
        dayNight = "PM";
        hours = hours - 12;
    } else if (hours == 0) {
        hours = 12;
    }

    if (hours < 10) {
        hours = `0${hours}`
    }

    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (secounds < 10) {
        secounds = `0${secounds}`
    }

    let days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    let day_num = date.getDay();
    let day = days[day_num + 1];
    if (day_num == 6) {
        day = days[0];
    }


    let month = date.getMonth() + 1;
    let full_date = ` ${date.getDate()} / ${month}  / ${date.getFullYear()}`

    document.querySelector(".time h1").textContent = `${hours} : ${minutes} : ${secounds} ${dayNight}`;
    document.querySelector('#day').textContent = day
    document.querySelector('#date').textContent = full_date
})

const findState = () => {
    const sucess = (e) => {
        let lat = e.coords.latitude;
        let lon = e.coords.longitude;
        let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=5f032a2c89e5c9b29550fc870d61f335`
        fetch(api).then(result => {
            let data = result.json();
            return data
        }).then(weather => {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted") {
                    document.querySelector("#w_txt").textContent = `${Math.ceil(weather.main.temp)}°`
                    document.querySelector("#country").textContent = `${weather.sys.country} (${weather.name})`
                    document.querySelector(".weather").style.display = "flex";
                    document.querySelector(".check_weather").style.display = "none";
                } else if (result.state === "prompt") {
                    document.querySelector(".weather").style.display = "none";
                    document.querySelector(".check_weather").style.display = "block";
                }
            });
            
        })
    }

    const error = (e) => {
        console.log(e)
    }

    let location = navigator.geolocation.getCurrentPosition(sucess, error);
}

navigator.permissions.query({ name: "geolocation" }).then((result) => {
    if (result.state === "granted") {
        findState();
    }else{
        document.querySelector(".weather").style.display = "none";
        document.querySelector(".check_weather").style.display = "block";
    }
});

document.querySelector(".check_weather").addEventListener("click", ()=>{
    findState(); 
})