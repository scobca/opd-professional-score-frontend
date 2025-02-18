<script setup lang="ts">

</script>

<template>
  <main class="form-container">
    <form action="#" method="post" id="email-verify-form" class="verify-email">
      <h3>Подтверждение электронной почты</h3>
      <div class="code-field">
        <label for="digit1"><input required id="digit1" min="0" max="9" type="number"></label>
        <label for="digit2"><input required id="digit2" min="0" max="9" type="number"></label>
        <label for="digit3"><input required id="digit3" min="0" max="9" type="number"></label>
        <label for="digit4"><input required id="digit4" min="0" max="9" type="number"></label>
        <label for="digit5"><input required id="digit5" min="0" max="9" type="number"></label>
        <label for="digit6"><input required id="digit6" min="0" max="9" type="number"></label>
      </div>
      <a id="resend-code" href="#">Отправить код еще раз</a>
      <button type="submit">Подтвердить</button>
    </form>
  </main>
</template>

<style scoped>
a{
  margin-bottom: 10px;
}

.form-container {
  padding-top: 25vh;
}

.verify-email {
  padding: 2%;
  width: 25vw;
}

.code-field {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 5% 0;
}

.code-field label {
  display: flex;
  width: 14%;
  aspect-ratio: 1/1;
}

.code-field input {
  width: 100%;
  font-size: 2.3vw;
  text-align: center;
  border-radius: 10px;
  border: solid 2px steelblue;
}

.code-field input[type='number'] {
  -moz-appearance:textfield;
  caret-color: transparent;
}
.code-field input::-webkit-outer-spin-button,
.code-field input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

form {
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 0 10px #4127e4;
  width: 500px;
  margin: 0 auto;
  position: relative;
  z-index: 1;

}

input[type="text"],
input[type="email"],
input[type="password"] {
  width: 95%;
  padding: 10px;
  border: 1px solid #5d558d;
  border-radius: 5px;
  transition: transform 0.3s;
  margin-bottom: 15px;
  font-size: 16px;
}

input::placeholder {
  color: rgba(116, 110, 110, 0.7);
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4127e4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #9a8bf8;
}
</style>