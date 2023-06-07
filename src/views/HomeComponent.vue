<template>
  <div class="home-wrap">
    <h1>Ready to friday?</h1>
    <RouterLink class="todos-link" to="/todos">GO!</RouterLink>
  </div>
</template>

<style>
  .home-wrap {
    height: 90vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1 {
    margin-bottom: 2rem;
  }
  .todos-link {
    padding: 15px 40px;
    color: #000;
    background: #fff;
    transition: .3s;
    cursor: pointer;
    font-size: 1.4rem;
    font-weight: 600;
    text-decoration: none;
    width: fit-content;
    border: 1px solid #000;
  }
  .todos-link:hover {
    filter: invert(1);
  }
</style>
