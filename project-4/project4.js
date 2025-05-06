function stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  
  function checkBirthday() {
    const input = document.getElementById("birthdayInput").value;
    const output = document.getElementById("output");
    output.innerHTML = "";
  
    if (!input) {
      output.innerText = "Please enter a valid birthday.";
      return;
    }
  
    const parts = input.split("-");
    const birthDate = new Date(
      Number(parts[0]),
      Number(parts[1]) - 1,
      Number(parts[2])
    );
  
    const today = stripTime(new Date());
  
    const birthMonth = birthDate.getMonth();
    const birthDay = birthDate.getDate();
    const birthYear = birthDate.getFullYear();
  
    const isBirthday = today.getMonth() === birthMonth && today.getDate() === birthDay;
  
    if (isBirthday) {
      const age = today.getFullYear() - birthYear;
      output.innerHTML = `<p>Happy Birthday! You're ${age} years old!</p>`;
      for (let i = 0; i < age; i++) {
        output.innerHTML += "🕯️";
      }
    } else {
      const nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);
      if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }
  
      const diffTime = stripTime(nextBirthday) - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      output.innerHTML = `Come back on your birthday! Your birthday is in ${diffDays} day(s).`;
    }
  }