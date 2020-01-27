document.addEventListener("DOMContentLoaded", () =>{
    fetchColoringBook()
    fetchDrawing()
    initiateDrawing()
    let saveButton = document.createElement("button")
    saveButton.innerText = "save"
    let body = document.querySelector("body")
    body.appendChild(saveButton)
    saveButton.addEventListener("click", event => saveImage(event))
   
    
   
   })
   
   function fetchDrawing(){
     fetch("http://localhost:3000/drawings")
     .then(response => response.json())
     .then(json => console.log(json))
   }
   
   function renderDrawing(json){
     let drawing = json[0].canvas_url
     const canvas = document.getElementById("draw")
     let ctx = canvas.getContext('2d')
     let img = new Image()
     img.onload = function() {
       ctx.drawImage(img, 0, 0)
     }
     img.src = drawing
     
   }
   
   function fetchColoringBook(){
     fetch('http://localhost:3000/challenges')
     .then(response => response.json())
     .then(json => renderColoringBooks(json))
   }
   
   function renderColoringBooks(json){
     let imgSrc = json[1].img_src
     
     document.body.style.backgroundImage = `url(${imgSrc})`
     document.body.style.backgroundRepeat = "no-repeat"
     document.body.style.background.height = window.height
     document.body.style.background.width = window.width
   
   
   
   
   }
   
   function initiateDrawing(){
   
     const canvas = document.getElementById("draw")
        let isDrawing = false
        const canvasDimension = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      
        canvasDimension.lineJoin = 'round';
        canvasDimension.lineCap = 'round';
        canvasDimension.lineWidth = 5;
        canvasDimension.strokeStyle = '#ac0000';
      
        
        let lastX = 0;
        let lastY = 0;
      
        function draw(e) {
          // stop the function if they are not mouse down
          if(!isDrawing) return;
          //listen for mouse move event
          
          canvasDimension.beginPath();
          canvasDimension.moveTo(lastX, lastY);
          canvasDimension.lineTo(e.offsetX, e.offsetY);
          canvasDimension.stroke();
          [lastX, lastY] = [e.offsetX, e.offsetY];
        }
      
        canvas.addEventListener('mousedown', (e) => {
          isDrawing = true;
          [lastX, lastY] = [e.offsetX, e.offsetY];
        });
      
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false)
   
   }
   
   function saveImage(event){
     event.preventDefault()
     let canvas = document.getElementById("draw")
     im
     canvas.getContext('2d')
     let dataURL = canvas.toDataURL(0,0)
     fetch("http://localhost:3000/drawings", {
       method: "POST",
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'},
       body: JSON.stringify({
         user_id: 1,
         challenge_id: 2,
         canvas_url: dataURL}) 
          
      
     })
     
     
   
   }