class Pokemon{
     constructor    (id, nombre, tipos, img){
          
          this.id        = id;
          this.nombre    = nombre;
          this.tipos     = tipos;
          this.img       = img;
          this.idFormato = ('000'+id).slice(-3);
     };
     
}

// let arreglo = [];
//      let tipos = ['fuego', 'ierba']
//      let pokito = new Pokemon(1, 'nombre', tipos, 'imagen');
//      // console.log(pokito);

//      arreglo.push(pokito);
//      arreglo.push(pokito);
//      console.log(arreglo[0].nombre);


