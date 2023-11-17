
const bcrypt = require('bcrypt-nodejs');
const Admin = require('./models/admin.models');
const Cliente = require('./models/cliente.models');
const Producto = require('./models/producto.models');
const Etiqueta = require('./models/etiqueta.models');
const populateDB = async () => {
    console.log('populateDB')
    if (process.env.DB_INIT == 'true') {
        const user1 = await Admin.create({
            nombres: 'miguel',
            apellidos: 'montania',
            email: 'miguel.montania@gmail.com',
            password: bcrypt.hashSync('123456'),
            rol: 'admin',
        });
        const cliente = await Cliente.create({
            nombres: 'Cliente1',
            apellidos: 'Apellido1',
            dni: '1234567',
            fechaNacimiento: '1998-02-12',
            pais: 'paraguay',
            genero: 'HOMBRE',
            telefono: '021456987',
            cel: '595987456',
            email: 'cliente1@example.com',
            password: bcrypt.hashSync('123456')
        })

        const cliente2 = await Cliente.create({
            nombres: 'Cliente2',
            apellidos: 'Apellido2',
            dni: '1234557',
            fechaNacimiento: '1995-02-12',
            pais: 'paraguay',
            genero: 'HOMBRE',
            telefono: '021456557',
            cel: '595965456',
            email: 'cliente2@example.com',
            password: bcrypt.hashSync('123456')
        })
        const cliente3 = await Cliente.create({
            nombres: 'Cliente3',
            apellidos: 'Apellido3',
            dni: '1234357',
            fechaNacimiento: '1993-02-12',
            pais: 'paraguay',
            genero: 'HOMBRE',
            telefono: '021456357',
            cel: '595935456',
            email: 'cliente3@example.com',
            password: bcrypt.hashSync('123456')
        })


        const etiqueta1 = await Etiqueta.create({
            titulo: '#LIMPIEZADELHOGAR',
            slug: 'limpiezadelhogar'
        })
        const etiqueta2 = await Etiqueta.create({
            titulo: '#CUIDADODEPRENDAS',
            slug: 'cuidadodeprendas'
        })

        const etiqueta3 = await Etiqueta.create({
            titulo: '#HIGIENEPERSONAL',
            slug: 'higienepersonal'
        })









        for (const productoData of productosData) {
            console.log(productoData);
            await Producto.create(productoData);
        }


    }

}

module.exports = { populateDB };
const productosData = [
    {
        sku: '300001200',
        titulo: 'LIMP. MULTIUSO PIXOL CITRONELA 900ML',
        slug: 'limp-multiuso-pixol-citronela-900ml',
        descripcion: 'LIMPIADOR900MLAMARILLO',
        peso: '0.5',
        precio: 12000,
        //precioAntesDolares: 1.6438356164,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001195',
        titulo: 'LIMP. MULTIUSO PIXOL LAVANDA 900ML',
        slug: 'limp-multiuso-pixol-lavanda-900ml',
        descripcion: 'LIMPIADOR900MLLILA',
        peso: '0.5',
        precio: 12000,
        //precioAntesDolares: 1.6438356164,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001197',
        titulo: 'LIMP. MULTIUSO PIXOL BOUQUET FLORAR 900ML',
        slug: 'limp-multiuso-pixol-bouquet-florar-900ml',
        descripcion: 'LIMPIADOR900MLROSA',
        peso: '0.5',
        precio: 12000,
        //precioAntesDolares: 1.6438356164,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001199',
        titulo: 'LIMP. MULTIUSO PIXOL FRESCURA HERBAL 900ML',
        slug: 'limp-multiuso-pixol-frescura-herbal-900ml',
        descripcion: 'LIMPIADOR900MLVERDE',
        peso: '0.5',
        precio: 12000,
        //precioAntesDolares: 1.6438356164,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '830000351',
        titulo: 'PACK PROMO DESOD. FANTASIA 900ML + 500 ML',
        slug: 'pack-promo-desod-fantasia-900ml-500-ml',
        descripcion: 'PACK PROMO DESOD. FANTASIA 900ML + 500 ML VARIOS',
        peso: '1.4',
        precio: 14700,
        //precioAntesDolares: 2.0136986301,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '830000352',
        titulo: 'PACK PROMO DESOD. UVA 900ML + 500 ML',
        slug: 'pack-promo-desod-uva-900ml-500-ml',
        descripcion: 'PACK PROMO DESOD. UVA 900ML + 500 ML VARIOS',
        peso: '1.4',
        precio: 14700,
        //precioAntesDolares: 2.0136986301,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '830000355',
        titulo: 'PACK PROMO DESOD. MARINA 900ML + 500 ML',
        slug: 'pack-promo-desod-marina-900ml-500-ml',
        descripcion: 'PACK PROMO DESOD. MARINA 900ML + 500 ML VARIOS',
        peso: '1.4',
        precio: 14700,
        //precioAntesDolares: 2.0136986301,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300000915',
        titulo: 'DET. LAVAVAJILLAS PIXOL 500ML LIMON',
        slug: 'det-lavavajillas-pixol-500ml-limon',
        descripcion: 'DETERGENTES500MLVERDE',
        peso: '0.5',
        precio: 7500,
        //precioAntesDolares: 1.0273972603,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300000444',
        titulo: 'POLVO GUAIRA OPTI FIBER 2 KLS',
        slug: 'polvo-guaira-opti-fiber-2-kls',
        descripcion: 'JABÓN EN POLVO2KGAZUL Y BLANCO',
        peso: '2',
        precio: 45000,
        //precioAntesDolares: 6.1643835616,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001226',
        titulo: 'JAB. AGRICULTOR VERDE 20 UN X 150 GRS',
        slug: 'jab-agricultor-verde-20-un-x-150-grs',
        descripcion: 'JABON150GRSVERDE',
        peso: '3',
        precio: 58750,
        //precioAntesDolares: 8.0479452055,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001153',
        titulo: 'TOC. COCO PURO 90 G 3X1 FLOWPACK FLORAL',
        slug: 'toc-coco-puro-90-g-3x1-flowpack-floral',
        descripcion: 'JABON DE TOCADOR90GROZA',
        peso: '0.27',
        precio: 11800,
        //precioAntesDolares: 1.6164383562,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001154',
        titulo: 'TOC. COCO PURO 90 G 3X1 FLOWPACK MARINA',
        slug: 'toc-coco-puro-90-g-3x1-flowpack-marina',
        descripcion: 'JABON DE TOCADOR90GCELESTE',
        peso: '0.27',
        precio: 11800,
        //precioAntesDolares: 1.6164383562,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001155',
        titulo: 'TOC. COCO PURO 90 G 3X1 FLOWPACK VERBENA',
        slug: 'toc-coco-puro-90-g-3x1-flowpack-verbena',
        descripcion: 'JABON DE TOCADOR90GVERDE',
        peso: '0.27',
        precio: 11800,
        //precioAntesDolares: 1.6164383562,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300001225',
        titulo: 'JAB. AGRICULTOR MARRON 20 UN X 150 GRS',
        slug: 'jab-agricultor-marron-20-un-x-150-grs',
        descripcion: 'JABON150grsMARRON',
        peso: '3',
        precio: 58750,
        //precioAntesDolares: 8.0479452055,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
    {
        sku: '300000646',
        titulo: 'C2 HUMECTANTE NARANJA Y JAZMIN PCK90G',
        slug: 'c2-humectante-naranja-y-jazmin-pck90g',
        descripcion: 'JABÓN DE TOCADOR90gNARANJA',
        peso: '0.09',
        precio: 3800,
        //precioAntesDolares: 0.5205479452,
        portada: 'perfil.png',
        categoria: 6,
        visibilidad: 'Todo el mundo', stock: 0,
        contenido: '<p>dasdasdas</p><p>asdas</p>'
    },
];

// Resto del código...
