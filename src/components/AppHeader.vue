<script setup lang="ts">

</script>

<template>
  <header class="header">
    <nav class="nav-container">
      <a href="index.html" class="logo"><img src="../assets/logo_end.png" width="150"> </a>

      <div class="nav-links">
        <a href="#professions" class="nav-item">Лист профессий</a>
        <a href="#professions" class="nav-item">Лист 2</a>

        <div class="auth-buttons">
          <a href="sign-in.html" class="btn login">Вход</a>
          <a href="sign-up.html" class="btn register">Регистрация</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  .header {
    padding: 2rem 5%;
    box-shadow: 0 2px 15px rgba(0,0,0,0.1);
    position: relative;
  }

  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 100vw;
    margin: 0 auto;
  }

  .nav-links {
    display: flex;
    gap: 2rem;
    align-items: center;
  }

  .nav-item {
    color: white;
    text-decoration: none;
    font-size: 1.1rem;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-item:hover {
    background: rgba(255,255,255,0.1);
  }

  .nav-item::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 2px;
    background: #fff;
    transition: all 0.3s;
  }

  .nav-item:hover::after {
    width: 70%;
    left: 15%;
  }

  .auth-buttons {
    display: flex;
    gap: 1rem;
    margin-left: 2rem;
  }

  .btn {
    padding: 0.6rem 1.5rem;
    border-radius: 25px;
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s;
  }

  .login {
    color: white;
    border: 2px solid rgba(255,255,255,0.3);
  }

  .login:hover {
    background: rgba(255,255,255,0.1);
    border-color: white;
  }

  .register {
    background: white;
    color: #1e3c72;
  }

  .register:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  }
</style>