<script>
  export let name = "Alex Rivera";
  export let role = "Senior UX Designer";
  export let location = "San Francisco, CA";
  export let avatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAn0iKCLVgdKPDICuxGFPOY7PYJKpkE3ShmOEzi_Ni5jC1QVOcoZbo87bgg5vx7Doy3cVBcvecU372fSRj3Kza79r5QDD2U4fz2xopWns9z5gtFxVzecTUy15etWnE0kuVd9oSZYZuqTk5_irkfgE0RY8zKTHQASNCGTr3-UgH6jkZS4LfJwBTeIfcQmlc_VZDX3OvykCvSiyUfhMz_jOd9YanDSuGd2cdaEhlfnzdtMJIIKX9y7XLVpSa8DvcDQfwy7MvDdad9J0I";

  export let followers = "1.2k";
  export let projects = "88";
  export let following = "450";
  export let bio =
    "Designing digital experiences that bridge the gap between humans and technology. Focused on accessibility and minimalist aesthetics.";
</script>

<div class="card">
  <div class="card-gradient"></div>

  <div class="card-body">
    <div class="header">
      <div class="avatar" style="background-image:url('{avatar}')"></div>

      <h2>{name}</h2>
      <p class="role">{role}</p>

      <div class="location">
        <span class="material-symbols-outlined">location_on</span>
        <span>{location}</span>
      </div>
    </div>

    <div class="stats">
      <div>
        <strong>{followers}</strong>
        <span>Followers</span>
      </div>
      <div>
        <strong>{projects}</strong>
        <span>Projects</span>
      </div>
      <div>
        <strong>{following}</strong>
        <span>Following</span>
      </div>
    </div>

    <p class="bio">"{bio}"</p>

    <div class="actions">
      <button class="icon-btn"><span class="material-symbols-outlined">share</span></button>
      <button class="icon-btn"><span class="material-symbols-outlined">public</span></button>
      <button class="icon-btn"><span class="material-symbols-outlined">code</span></button>
    </div>

    <div class="buttons">
      <button class="btn primary">Follow</button>
      <button class="btn secondary">Message</button>
    </div>
  </div>
</div>

<style>
/* ---------- Variables ---------- */
:root {
  --primary: #f9f506;
  --bg-light: #f8f8f5;
  --card-light: #ffffff;
  --border-light: #e6e6db;
  --text-dark: #181811;
  --text-muted: #8c8b5f;
}

:global(.dark) {
  --bg-light: #23220f;
  --card-light: #2d2c16;
  --border-light: #3a391a;
  --text-dark: #ffffff;
  --text-muted: #a0a07d;
}

/* ---------- Card ---------- */
.card {
  width: 100%;
  max-width: 420px;
  background: var(--card-light);
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--border-light);
  box-shadow: 0 25px 50px rgba(0,0,0,0.15);
  font-family: "Spline Sans", sans-serif;
}

.card-gradient {
  height: 130px;
  background: linear-gradient(
    90deg,
    var(--primary),
    rgba(249,245,6,0.6),
    rgba(249,245,6,0.2)
  );
}

.card-body {
  padding: 2rem;
}

/* ---------- Header ---------- */
.header {
  text-align: center;
  margin-top: -80px;
}

.avatar {
  width: 128px;
  height: 128px;
  margin: 0 auto;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  border: 4px solid var(--card-light);
  box-shadow: 0 8px 16px rgba(0,0,0,0.15);
}

h2 {
  margin-top: 1rem;
  font-size: 1.9rem;
  color: var(--text-dark);
}

.role {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
}

.location {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

/* ---------- Stats ---------- */
.stats {
  display: flex;
  justify-content: space-around;
  padding: 1.5rem 0;
  margin: 1.5rem 0;
  border-top: 1px solid var(--border-light);
  border-bottom: 1px solid var(--border-light);
}

.stats div {
  text-align: center;
}

.stats strong {
  display: block;
  font-size: 1.2rem;
  color: var(--text-dark);
}

.stats span {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--text-muted);
}

/* ---------- Bio ---------- */
.bio {
  text-align: center;
  font-style: italic;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
}

/* ---------- Social Actions ---------- */
.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: #f5f5f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

:global(.dark) .icon-btn {
  background: #3a391a;
}

.icon-btn:hover {
  background: var(--primary);
}

/* ---------- Buttons ---------- */
.buttons {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.btn {
  flex: 1;
  height: 48px;
  border-radius: 999px;
  font-weight: 700;
  cursor: pointer;
  border: none;
}

.primary {
  background: var(--primary);
  color: #181811;
  box-shadow: 0 10px 20px rgba(249,245,6,0.3);
}

.secondary {
  background: #f5f5f0;
  color: var(--text-dark);
  border: 1px solid var(--border-light);
}

:global(.dark) .secondary {
  background: #3a391a;
}

.primary:hover,
.secondary:hover {
  opacity: 0.9;
}
</style>
