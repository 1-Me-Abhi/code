<script>
    import Card from "./component/Card.svelte";
</script>

<main class="app">
    <Card />
</main>

<style>
    .app {
        display: grid;
        place-items: center;
        min-height: 100vh;
        padding: 1rem;
        background: var(--bg-light, #f8f8f5);
    }
</style>
