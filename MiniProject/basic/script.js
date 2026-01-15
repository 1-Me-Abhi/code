const input=document.getElementById('name');
const output=document.getElementById('output');
const runButton=document.getElementById('runButton');
output.innerHTML=localStorage.getItem('names') || '';

runButton.addEventListener('click',()=>{
    const inputname =input.value;
    const li = document.createElement('li');
    li.textContent=`Hello, ${inputname}! Welcome to the Mini Project.`;
    output.appendChild(li);
    localStorage.setItem('names', output.innerHTML);
    // output.textContent=`Hello, ${inputname}! Welcome to the Mini Project.`;
    input.value='';
})