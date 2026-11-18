// Contenido editable de la web de Xorreo.
// Carta transcrita de su carta digital (menu.restawa.com/xorreo-street-food, 18-11-2026).
// Se han corregido erratas evidentes (showarma, Kentuky, rayada, tain...).
// `img` solo se pone donde la foto del cliente encaja con el plato: confirmar con ellos las marcadas.

export const info = {
  name: 'Xorreo Street Food',
  address: 'Av. de Andalucía, 89',
  postal: '29580',
  town: 'Estación de Cártama',
  region: 'Málaga',
  mapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Xorreo+Street+Food%2C+Av.+de+Andaluc%C3%ADa+89%2C+29580+Estaci%C3%B3n+de+C%C3%A1rtama',
  menuUrl: 'https://menu.restawa.com/xorreo-street-food/',
  phone: '952 32 51 52',
  phoneHref: 'tel:+34952325152',
  // Horario de su carta digital.
  hours: [
    ['Jueves a martes', '20:00 – 00:00'],
    ['Miércoles', 'Cerrado'],
  ],
  hoursSchema: ['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu'],
  social: [
    { name: 'Instagram', url: 'https://www.instagram.com/xorreo_/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@xorreo_' },
  ],
};

// Alérgenos (códigos de su carta).
export const allergens = {
  GL: 'Gluten',
  CR: 'Crustáceos',
  H: 'Huevo',
  P: 'Pescado',
  SO: 'Soja',
  L: 'Lácteos',
  AP: 'Apio',
  MO: 'Mostaza',
  SE: 'Sésamo',
  SU: 'Sulfitos',
};

export const menu = [
  {
    id: 'burgers',
    name: 'Hamburguesas',
    items: [
      { name: 'La Perigord', price: 16, al: ['GL', 'H', 'P', 'SO', 'L', 'MO', 'SU'], desc: 'Pan brioche, 180 g de fat smash, pulled de jarrete de vacuno con foie gras y trufa, queso San Simón ahumado y emulsión de boletus con wasabi. Topping de salsa unagi y salsa de setas con perlas de arroz y cebollino.' },
      { name: 'La Masiva', price: 16, img: 'burger-lomo', al: ['GL', 'H', 'P', 'L', 'AP', 'MO', 'SE', 'SU'], desc: 'Pan brioche con sésamo, 180 g de añojo, doble queso ahumado, cebolla caramelizada, láminas de chuletón madurado, cecina ahumada y salsa Café de París.' },
      { name: 'La Vacuna de Vacuno', price: 14, img: 'bacon-cebolla', al: ['GL', 'H', 'P', 'L', 'AP', 'MO', 'SU'], desc: 'Pan high, medallón de 180 g de vacuno, doble cheddar, bacon, miel ahumada de cecina, cebolla crujiente, salsa Xorreo y topping de azúcar glas.' },
      { name: 'Carbonara', price: 14, al: ['GL', 'H', 'L'], desc: 'Pan high, doble carne de añojo smash, queso ahumado, guanciale, parmesano, salsa carbonara, emulsión de yema de huevo y polvo de bacon.' },
      { name: 'La Belzeburguer', price: 13, img: 'negra-smash', tags: ['Pan negro'], al: ['GL', 'H', 'SO', 'L', 'AP', 'MO', 'SE', 'SU'], desc: 'Pan negro de ceniza, 180 g de añojo, queso de cabra, cheddar, piquillos caramelizados al balsámico, cebolla encurtida y BBQ Bourbon.' },
      { name: 'Bad Chicken', price: 13, img: 'black-chicken', tags: ['Pan negro'], al: ['GL', 'H', 'P', 'L', 'MO', 'SU'], desc: 'Pan negro de ceniza, pollo crujiente estilo Kentucky, cheddar, bacon, lechuga, tomate, parmesano y salsa César. Topping de polvo de bacon.' },
      { name: 'Red Velvet', price: 13, al: ['GL', 'P', 'SO', 'AP', 'SU'], desc: 'Pan brioche rojo, pulled de pollo, cheddar, aros de cebolla crujientes, salsa buffalo y azúcar glas de topping.' },
      { name: 'La Fifty / Fifty', price: 14, al: ['GL', 'H', 'P', 'SO', 'L', 'AP', 'MO', 'SE', 'SU'], desc: 'Pan de semillas. La Cheese-B partida por la mitad, sobre salsa caliente de setas, trufa y parmesano rallado.' },
      { name: 'Cheese-B', price: 11, al: ['GL', 'H', 'P', 'L', 'AP', 'MO', 'SE', 'SU'], desc: 'Pan de semillas, 180 g de añojo, cheddar, bacon, lechuga romana, tomate, cebolla fresca y salsa Xorreo.' },
      { name: 'Japo Gabacha Smash', price: 10, priceAlt: { label: 'Doble', price: 13 }, al: ['GL', 'H', 'L', 'MO', 'SU'], desc: 'Pan high, medallón smash, cheddar, cebolla caramelizada al teriyaki, emulsión de wasabi y trufa, crujiente wonton y nieve de parmesano.' },
      { name: 'Smash Bacon Cheese', price: 8, priceAlt: { label: 'Doble', price: 11 }, al: ['GL', 'H', 'P', 'L', 'AP'], desc: 'Pan brioche, carne de añojo smash, bacon crujiente, cheddar y salsa Bull. La doble lleva doble carne y doble cheddar.' },
    ],
  },
  {
    id: 'callejera',
    name: 'Comida callejera',
    items: [
      { name: 'Pollo XFC', price: 11, priceAlt: { label: '½ ración', price: 8 }, img: 'pollo-salsa', unit: '9 / 6 uds', al: ['GL', 'AP'], desc: 'Pollo frito al estilo Kentucky con salsa Xorreo.' },
      { name: 'Chicharrón crujiente', price: 9, img: 'panceta-lima', unit: '3 uds', tags: ['Picante'], al: ['GL', 'H', 'P', 'L', 'SU'], desc: 'Torrezno con salsa huancaína, takis machacados, tajín y lima.' },
      { name: 'Alitas Texas Rangers', price: 10, unit: '6 uds', tags: ['Picante'], al: ['GL', 'H', 'P', 'SO', 'L', 'AP', 'SU'], desc: 'Alitas de pollo marinadas y rebozadas al estilo Kentucky.' },
      { name: 'Empanaditas colombianas', price: 8, img: 'yuca-empanadas', unit: '7 uds', al: ['SO', 'AP'], desc: 'Maíz crujiente, relleno de ternera, con salsa Medallo y lima.' },
      { name: 'Torpedos', price: 8, unit: '6 uds', tags: ['Picante'], al: ['GL', 'CR', 'H', 'P', 'SU'], desc: 'Langostinos rebozados en panko japonés, fritos y glaseados en kimchi cítrico y ralladura de lima.' },
      { name: 'Corn ribs', price: 7, unit: '6 uds', tags: ['Picante'], al: ['P', 'SO', 'L', 'AP'], desc: 'Costillas de maíz glaseadas en salsa buffalo, tajín, takis y lima. Muy potentes.' },
      { name: 'Croquetas de boletus', price: 12, unit: '6 uds', al: ['GL', 'H', 'SO', 'L', 'MO', 'SU'], desc: 'Muy umami. Con emulsión de wasabi con trufa y salsa yakitori por encima.' },
      { name: 'Croquetas de picaña madurada', price: 15, unit: '6 uds', al: ['GL', 'H', 'P', 'AP', 'SE'], desc: 'Supercremosas, con toque de maduración, láminas de cecina ahumada y salsa Bull. Puro bocado de carne.' },
      { name: 'Dumplings de pato', price: 12, unit: '6 uds', tags: ['Para compartir'], al: ['GL', 'P', 'SO', 'L'], desc: 'Pasta rellena japonesa en salsa francesa de trufa y setas, con parmesano rallado, salsa unagi dulce, cebollino y sésamo.' },
      { name: 'Boniato frito tex-mex', price: 8, al: ['GL', 'H', 'P', 'L', 'AP', 'MO', 'SU'], desc: 'Boniato frito con salsa Xorreo, carne tex-mex, jalapeños y takis.' },
      { name: 'Crispy tuna', price: 12, unit: '3 uds', al: ['GL', 'H', 'P', 'SO', 'MO', 'SU'], desc: 'Bocados de tartar de atún estilo coreano sobre crujiente de wonton, bolas de arroz, pico de gallo y emulsión de wasabi.' },
      { name: 'Costilla Vice City', price: 18, priceAlt: { label: '½ ración', price: 13 }, al: ['GL', 'P', 'SO', 'AP', 'MO', 'SE', 'SU'], desc: 'Costilla de cerdo ahumada, cocinada lentamente y glaseada en BBQ Bourbon, con patatas fritas.' },
      { name: 'Nachos CDMX', price: 9, al: ['L', 'MO', 'SU'], desc: 'Totopos de maíz, cheddar fundido, pico de gallo, jalapeños, cebolla encurtida, carne estilo Sinaloa, lima y tajín.' },
      { name: 'Paris butter steak', price: 22, al: ['GL', 'P', 'L', 'AP', 'MO', 'SU'], desc: 'Entrecot trinchado sobre patatas fritas, con espuma de mantequilla estilo Café de París.' },
      { name: 'Yuca frita', price: 6, desc: 'Bastones de yuca frita con salsa huancaína y tajín.' },
    ],
  },
  {
    id: 'empezar',
    name: 'Para empezar',
    items: [
      { name: 'French fries', price: 4, desc: 'Patatas naturales fritas con sal.' },
      { name: 'Bravas', price: 6, tags: ['Picante'], al: ['H', 'P', 'SO', 'L', 'AP', 'SU'], desc: 'Patatas fritas con salsa buffalo picante y salsa blanca.' },
      { name: 'Henrichs fries', price: 7, al: ['H', 'L', 'MO', 'SU'], desc: 'Patatas fritas con pollo shawarma, salsa cheddar, salsa blanca y polvo de bacon crujiente.' },
      { name: 'Ensalada Goat', price: 11, desc: 'Brotes de lechuga con queso de cabra a la plancha, vinagreta de fresa, nueces, arándanos, piquillo caramelizado y cebolla encurtida.' },
      { name: 'Ave César', price: 12, desc: 'Brotes de lechuga, salsa César, pollo Kentucky, tomates secos, picatostes y parmesano.' },
    ],
  },
  {
    id: 'rollos',
    name: 'Rollos',
    items: [
      { name: 'Shawarma de pollo', price: 9, al: ['GL', 'H', 'L', 'MO', 'SE', 'SU'], desc: 'Pan libanés, pollo asado al carbón, salsa de yogur, lechuga, tomate, cebolla encurtida y queso feta.' },
      { name: 'Burrito Mixtón', price: 10, img: 'wrap-queso', al: ['GL', 'H', 'L', 'MO', 'SU'], desc: 'Carne de añojo estilo Sinaloa, totopos, jalapeños, queso fundido, lechuga, tomate, cebolla y salsa blanca.' },
      { name: 'Campero', price: 10, desc: 'Nuestra versión: pollo asado en nuestro adobo, cheddar, bacon, lechuga, tomate, cebolla y mayonesa en pan crujiente. Con patatas.' },
    ],
  },
  {
    id: 'peques',
    name: 'Menú peques',
    note: 'Con patatas y bebida a elegir.',
    items: [
      { name: 'Pollo KFC', price: 12, desc: 'Pollo estilo Kentucky con patatas, salsa barbacoa y bebida.' },
      { name: 'Smash simple', price: 12, desc: 'Hamburguesa smash simple con patatas y bebida.' },
    ],
  },
  {
    id: 'postres',
    name: 'Postre',
    items: [
      { name: 'Tarta de queso casera', price: 3, desc: 'Pregunta en sala por la de hoy: la clásica o alguna de nuestras versiones especiales.' },
    ],
  },
];

// Salsas extra, 2 € cada una.
export const sauces = {
  price: 2,
  items: [
    { name: 'Xorreo', desc: 'Nuestra salsa clásica de burger.', al: ['GL', 'H', 'P', 'AP', 'MO', 'SU'] },
    { name: 'BBQ Smoke Bourbon', desc: 'A fuego lento con whisky bourbon, ahumada y dulce.', al: ['GL', 'P', 'SO', 'AP', 'MO', 'SE', 'SU'] },
    { name: 'Buffalo Miso', desc: 'Roja americana picante con miso japonés.', al: ['P', 'SO', 'AP', 'SU'], hot: true },
    { name: 'Bull', desc: 'Intensa, con sabor profundo a carne.', al: ['GL', 'H', 'P', 'AP', 'SE'] },
    { name: 'Cheddar', desc: 'Crema de cheddar y edam, ligeramente especiada.', al: ['L', 'MO'] },
    { name: 'Blanca', desc: 'Yogur griego, ajo, especias, limón y aceite de oliva.', al: ['H', 'L'] },
    { name: 'Miel ahumada de cecina', desc: 'Miel y cebolla caramelizada con toque de cecina.', al: ['GL', 'P', 'MO', 'SU'] },
    { name: 'Huancaína', desc: 'Cremosa, de cheddar, parmesano y limón.', al: ['H', 'P', 'L', 'SU'] },
    { name: 'Medallo', desc: 'Emulsión de kimchi coreano con lima.', al: ['H', 'P', 'SU'] },
    { name: 'César', desc: 'Mayonesa y Dijon con alcaparras y un toque de kimchi.', al: ['GL', 'H', 'P', 'L', 'MO', 'SU'] },
    { name: 'Wasabi trufa', desc: 'Wasabi con aceite de trufa. No pica.', al: ['GL', 'H', 'MO', 'SU'] },
    { name: 'Café de París', desc: 'Mantequillosa, de hierbas y especias.', al: ['GL', 'P', 'L', 'AP', 'MO', 'SU'] },
    { name: 'Carbonara', desc: 'Cremosa y ahumada, con final suave.', al: ['H', 'SO', 'L', 'SU'] },
    { name: 'Setas con trufa', desc: 'Setas y el toque de la trufa.' },
  ],
};

// Capas de la burger del hero (de abajo arriba). Etiquetas genéricas: confirmar con qué burger de la carta se corresponde.
export const burgerLayers = [
  { file: 'burger-base', label: 'Pan negro de ceniza' },
  { file: 'burger-carne', label: 'Smash de añojo' },
  { file: 'burger-cheddar', label: 'Cheddar fundido' },
  { file: 'burger-col', label: 'Crujiente morado' },
  { file: 'burger-salsa', label: 'Salsa de la casa' },
  { file: 'burger-pan', label: 'Pan negro de ceniza' },
];
