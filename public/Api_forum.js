
document.addEventListener('DOMContentLoaded', () => {
  // Realizar una solicitud a tu API
  fetch('/getDiscussions')
      .then(response => response.json())
      .then(data => {
          // Obtener el contenedor principal
          const apiDataContainer = document.getElementById('api-data-container');

          // Recorrer los datos y crear contenedores individuales para cada fila de datos
          data.forEach(discusion => {
              // Crear un nuevo contenedor
              const newContainer = document.createElement('div');
              newContainer.className = 'row';
              newContainer.style.width = '100%';

              // Actualizar el contenido del nuevo contenedor con los datos de la API
              newContainer.innerHTML = `
                <div class="card" style="width: 100%;">
                  <div class="card-body">
                    <h5 class="card-title" style="color: #008164;">${discusion.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Usuario: ${discusion.user}</h6>
                    <p class="card-text">${discusion.instrucions}</p>
                    <i style="font-size: 20px" class="ion-chatbubbles">Respuestas</i>
                  </div>
                </div>
                <p style="margin-top: 30px;">Comenta como ${discusion.user}</p>
                <div class="input-group">
                <form action="/answers_forum/${discusion.iduser}" method="post" style="width: 100%;">
                  <input type="hidden" name="id_foro" value="${discusion.idforms}">
                  <textarea required style="border-radius: 0%;width: 100%;" name="respuesta" class="form-control" aria-label="With textarea" placeholder="Escribe tu respuesta"></textarea>
                  <span style="margin-left: 1px;padding-left: 90%;width: 100%;background-color: #f8f5f5e7; display: flex; flex-direction: column; align-items: flex-start; margin-top: -2px;" class="input-group-text"><button style="border-radius: 18em; font-size: smaller; border-color: #cecece; display: flex; flex-direction: column; align-items: flex-start;" type="submit">Enviar</button></span> 
                </form>
                </div>
                <h4 style="margin-top: 40px;">Respuestas</h4>
                <div class="container" id="answer${discusion.idforms}">
                
            </div>
              `;
              
              // Agregar el nuevo contenedor al contenedor principal
              apiDataContainer.appendChild(newContainer);

              fetch('/getAnswers/'+discusion.idforms)
              .then(resp => resp.json())
              .then(data => {
                  // Obtener el contenedor principal
                  const apiDataContainerAn = document.getElementById('answer'+discusion.idforms);
        
                  // Recorrer los datos y crear contenedores individuales para cada fila de datos
                  data.forEach(answer => {
                      // Crear un nuevo contenedor
                      const newContainer = document.createElement('div');
                      newContainer.className = 'row';
                      newContainer.style.width = '100%';
        
                      // Actualizar el contenido del nuevo contenedor con los datos de la API
                      newContainer.innerHTML = `
                          <div class="row col-md-12" style="margin-top: 30px">
                          <div class="col-md-6" style=" width: 60px; height: 50px;border-radius: 50%;" >
                              <img style="width: 100%; height: auto"src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7X-z_nosp27oF6zJ3chOXAJgG8Fq1CW3I-g&usqp=CAU" alt="" >
                          </div>
                          <div class="row col-md-5">
                              <p>${answer.usuario}</p>
                          </div>
                      </div>
      
                      <div class="row col-md-12">
                          <p>${answer.content}</p>
                          <div class="col-md-12">
                              <i class="ion-thumbsup" style="font-size: 20px" >  Me gusta</i>
                              <i class="ion-chatbubbles" style="margin-left: 15px;font-size: 20px" >  Responder</i>
                          </div>
                      </div>
                      <hr>
      
                      `;
                      
                      // Agregar el nuevo contenedor al contenedor principal
                      apiDataContainerAn.appendChild(newContainer);
                  });
              })
              .catch(error => {
                  console.error('Error al obtener datos de la base de datos:', error);
              });   
          });
      })
      .catch(error => {
          console.error('Error al obtener datos de la base de datos:', error);
      });
});

