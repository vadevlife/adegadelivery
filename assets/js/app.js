 
 
  search = ()=> {
    
    let  id = document.getElementById('search')  
    let  serchInput = document.getElementById('serchInput')   
    let  searchResult = document.getElementById('searchResult')   
     
    searchResult.innerHTML=""
    

    submitSearch=(event)=>{
      let searched=event.target.value  
      const productFound=ProductsFilter(searched)  
     
      productFound.length > 0 ? render(productFound) :  searchResult.innerHTML="Produto não encontrado"

      if( searched.length=='' ){
        searchResult.innerHTML=""
        searchResult.setAttribute("view","hide")
        body.style.cssText="overflow: auto";


        
      }else{
       ProductsFilter(searched)  
      }
    }

    ProductsFilter=(searched)=>{
        return listProd.filter(p=>{
           return p.name.toLowerCase().includes(searched.toLowerCase())  
        })  
      }
    serchInput.addEventListener('keyup', _.debounce(submitSearch, 500))
 

    totalProducts=(listProd)=>{ 
    //   console.log(listProd.length)
    }
    totalProducts(listProd)

    function render(productFound){   
      body.style.cssText="overflow: hidden";
      serchInput.style.cssText+="display:block;"
      searchResult.setAttribute("view","show")
      productFound.map((pr)=>{  
            searchResult.innerHTML+=`
                   <div class="product" id=`+pr.id+` onclick="toggle('`+pr.id+`')" view="false">   
                    <div style="padding: 10px 10px;order: 2;width: 27%;">
                            <h4 style="font-weight: 400;text-transform: uppercase;margin: 0;">`+pr.name+`</h4>
                         
                            <span  style="font-weight: 400;">`+pr.price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</span> 

                        </div>  
                        <button  style="order: 2;width: 20px;height: 20px;display: flex;justify-content: center;align-items: center;background: black;margin: 0 0px 0 43px;" class="">+</button> 

                        <div style="margin: 0 25px; position: relative;order: 1;width: 23%;display: flex;justify-content: center;">   
                            <img style="width: 120px;margin-left: 5px;" src="produtos/`+pr.img+`" alt="">
                        </div>

                        <div style="position: absolute;right: -106px;width: 96px;height: 100%;">  
                            <button key=`+pr.id+` onclick="addProd(this)" class="cartBtn">Comprar</button> 
                        </div>  
                </div> 
            </div>   
            `;    
        }) 
   }
   



   

  }
  search()

    var body=document.getElementsByTagName("body")[0]
    
    initApp = () => { 
   
       var launcherID = document.getElementById('launcher')
       
       var input ="<input id=inputName type='text' placeholder='Digite seu nome aqui' required >"
       var button ="<button onclick=getData()  type='button' placeholder='Digite seu nome aqui' required >Iniciar</button>" 
    
   
       getData = () => {
   
           userName=document.getElementById('inputName').value
           userEnd=document.getElementById('inputEnd').value
   
           body.style.cssText+="overflow-y: auto;"
   
           if(userName.length>=2 & userEnd.length>=2){
               Products(userName,userEnd) 
               
               setTimeout( 
                   launcherID.style.cssText="display:none;"
               , 1000);
           }else{
               alert('Para começar preencha os campos')
           }
       }
     
   }
    initApp()
   
   Products = (userName,userEnd) => { 
      
   
     var container=document.getElementById('products')
     var welcome=document.getElementById('welcome')
   
     welcome.style.cssText=`
         margin:10px 0;  
         display: flex; 
         align-items: center; 
         padding: 0px 35px; 
     `;
       
    
       welcome.innerHTML+="<div><p style='  margin: 0px auto 5px;  font-size: 15px;  color: #8C9099;  padding: 0 5px; display: block;   margin-left: auto;  margin-right: auto; line-height: 1.2;'> Olá, <strong style='font-weight: 700;color: #4BE8A0; letter-spacing: 1px;'>"+userName+"</strong> faça seu pedido.</p><p style='font-size: 12px;margin: 0 5px; line-height: 1.2; white-space: nowrap;'> <i class='fa-solid fa-location-dot' style=' margin: 0 4px 0 0;'></i>"+userEnd+"</p><div>" 
       
    
       body.setAttribute("status", "logado")
   
     allProds.map((el)=>{ 
         var ii=el.itens 
   
         
         container.innerHTML+=`<h3 style="margin: 35px auto;">`+el.categoria+`</h3>`;
       
         for (var b = 0; b < ii.length; b++) { 
           var itemProdId=ii[b].id
           var itemProdName=ii[b].name
           var itemProdDescription=ii[b].description
           var itemProdPrice=ii[b].price
           var itemProdImg=ii[b].img
    
           container.innerHTML+=`  
               <div class="product" id=`+itemProdId+` onclick="toggle('`+itemProdId+`')" view="false">   
                       <div style="padding: 10px 10px;order: 2;width: 27%;">
                               <h4 style="font-weight: 400;text-transform: uppercase;margin: 0;">`+itemProdName+`</h4>
                               <p>`+itemProdDescription+`</p>
                               <span  style="font-weight: 400;">`+itemProdPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</span> 
                           </div>  
                           <button  style="order: 2;width: 20px;height: 20px;display: flex;justify-content: center;align-items: center;background: black;margin: 0 0px 0 43px;" class="">+</button> 
   
                           <div style="margin: 0 25px; position: relative;order: 1;width: 23%;display: flex;justify-content: center;">   
                               <img style="width: 120px;margin-left: 5px;" src="`+itemProdImg+`" alt="">
                           </div>
   
                           <div style="position: absolute;right: -106px;width: 96px;height: 100%;">  
                               <button key=`+itemProdId+` onclick="addProd(this)" class="cartBtn">Comprar</button> 
                           </div>  
                   </div> 
               </div>   
           `;
           }
       }) 
   
    
       addProd=(prodThis)=>{
   
         let key=prodThis.getAttribute('key')
         listProd[key].quantidade++ 
         Cart(true) 
   
         
       }
   
       }
       
   Cart = (status) =>{ 
     containerCart=document.getElementById('CartMenu')  
     itensCesta=document.getElementById('qtd')  
     containerCart.innerHTML=` <button style="   background:transparent; z-index: 999;left: 5px;margin: 20px;border:0" onclick="toggle('CartMenu')"> <i class="fa-solid fa-chevron-left"></i></button>`;
     var nitens=0
     var total=0
   
     listProd.map((el)=>{  
       if(el.quantidade > 0){ 
   
        nitens2=nitens+=el.quantidade
        total2=total+=el.price*el.quantidade 
   
        quantProd=el.price*el.quantidade //Calcula a soma do mesmo item
        itensCesta.innerHTML=nitens2 //Mostra quantidad
          
           n=el.name  
           containerCart.innerHTML+=`  
               <div class="itemProd">
                   <div class="nameProd">`+el.quantidade+` `+el.name+` </div> 
                   <p>`+el.description+`</p>
                   <span>`+quantProd.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</span>
                   <button  key=`+el.id+` style="float:right;position: absolute;right: 20px;" onclick="removeProd(this)">  Remover </button>
               </div>  
               
           `;  
       } else{
          console.log(el.quantidade )
         }  
      
     })
   
     if(status==true){ 
           alert('Produto adicionado ')
     }else{
         alert('Produto removido  ') 
     } 
       totalReal=total2.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) 
       containerCart.innerHTML+=`<div style="   box-shadow: 0px -7px 12px #d9d9d9;position: fixed; bottom: 0; background: #ffffff; width: 100%; "><div style=" display: flex; justify-content: center; margin: 15px auto 0; color: #686868; ">Total da Compra: `+total2.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})+`</div ><button onclick="enviarPedido()" style="float: inherit;margin: 20px auto;border: 1px solid #46d995;bottom: 25px;width: 230px;height: 45px;background: #46d995;color: white;border-radius: 40px;display: flex;text-transform: uppercase;font-weight: 700;letter-spacing: 1px;align-items: center;justify-content: center;text-decoration: none;" onclick="removeProd(this)"><i style="margin-right: 5px;"  class="fa-brands fa-whatsapp"></i>        Enviar Pedido </button> </div>  `
       
   }
   
   enviarPedido=()=>{  
       var cesta=document.querySelectorAll("div#CartMenu .itemProd")
       
       for (let index = 0; index < cesta.length; index++) {
           const element = cesta[index];
           name+=element.childNodes[1].innerHTML      
   
           msg="("+name+")  " 
       }
       console.log(  msg  )
       url="https://wa.me/+5512996048083?text=Olá meu nome é "+userName+", endereço ("+userEnd+"), Pedido: "+msg+"Total à pagar:"+totalReal;
       location.href = url
   
   }
   
   removeProd=(prod)=>{
    
       let key=prod.getAttribute('key')
       listProd[key].quantidade--
       Cart(false)
    }
   
   toggle=(id)=>{ 
   
     var thisID=document.getElementById(id) 
     var body = document.getElementsByTagName("body")[0]
    
   
       if(thisID.getAttribute("view")=="false") {
          
         if(thisID.getAttribute("id")=="CartMenu"){
           
         }
        
         thisID.setAttribute("view", "true") 
       } else { 
          
           thisID.setAttribute("view", "false") 
       }  
   }
   
    
 