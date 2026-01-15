<script>
  import { onMount } from 'svelte';

  let count = 0;
  let ready = false;

  onMount(() => {
    const savedCount = localStorage.getItem('count');
    if (savedCount !== null) {
      count = Number(savedCount);
    }
    ready = true; // ✅ now saving is allowed
  });

  $: if (ready) {
    localStorage.setItem('count', count);
  }
</script>

<main>
  <div class="container">
    <h1>Counter App</h1>
    <div class="count">Count: {count}</div>

    <button onclick={() => count++}>+</button>
    <button onclick={() => count--}>−</button>
  </div>
</main>


<style>
  main {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40vw;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
  }

  .count {
    font-size: 2rem;
    margin: 1rem 0;
  }

  .buttons button {
    font-size: 1.5rem;
    margin: 0 0.5rem;
    padding: 0.5rem 1rem;
  }
</style>
