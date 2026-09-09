// Contenido de la presentación. Todo el texto vive aquí para corregirlo en un solo lugar.
// Fuente: "Diseño, producción y formación profesional: análisis de una experiencia de pasantía en EcoDeco Diseño Sostenible",
// Diego Esteban Henao Beltrán, Universidad del Valle, 2026.

window.SITIO = {
  titulo: "Diseño, producción y formación profesional",
  subtitulo: "Análisis de una experiencia de pasantía en EcoDeco Diseño Sostenible",
  autor: "Diego Esteban Henao Beltrán",
  director: "Ángel Miguel Uribe Becerra (Mg.)",
  programa: "Programa de Diseño Industrial · Facultad de Artes Integradas",
  universidad: "Universidad del Valle · Santiago de Cali · 2026",
  resumen: "Una pasantía en un taller de Cali que fabrica mobiliario a medida con madera recuperada de estibas. Qué aporta un diseñador industrial en una pequeña empresa, y qué revela esa experiencia sobre las condiciones en que se forman los pasantes.",
  palabras: ["Diseño industrial", "Formación profesional", "Mobiliario sostenible", "Procesos productivos", "Pymes"]
};

// Ciclo de la portada: las cinco etapas del flujo de trabajo de EcoDeco (capítulo 5, Metodología).
window.CICLO = [
  { ico: "🪵", t: "Estiba recuperada", d: "La materia prima principal es madera de pino recuperada de estibas y otros elementos en desuso. Para aplicaciones específicas también se usa tablero RH." },
  { ico: "🔍", t: "Clasificación", d: "La madera se inspecciona y clasifica según sus características físicas para aprovecharla al máximo. Si el material lo exige, el diseñador ajusta el diseño sin afectar función ni estética." },
  { ico: "📐", t: "Diseño y planos", d: "El diseñador interpreta los requerimientos del cliente y los convierte en un modelo 3D en SolidWorks y en planos de fabricación. Si hay estructura metálica, también documenta para el proveedor externo." },
  { ico: "🪚", t: "Fabricación", d: "Alistamiento, corte, ensamble, machimbrado, resane, lijado, acabados y control de calidad. El diseñador acompaña al taller para resolver dudas y verificar que se cumplan los planos." },
  { ico: "🪑", t: "Mueble único", d: "El mobiliario se entrega o se instala. Cada pieza es distinta: el material recuperado y el trabajo manual le dan un carácter propio y una historia." }
];

// Casos de estudio (capítulo 10): imágenes del documento en el orden del proceso.
window.PROYECTOS = {
  closet: { t: "Clóset industrial", linea: "Línea de mobiliario para el hogar y organización",
    d: "Clóset personalizado para uso residencial. El cliente entregó una imagen de referencia y requerimientos de dimensiones, capacidad y distribución interna. Se resolvió con madera de pino recuperada y estructura metálica, que conserva el lenguaje industrial y garantiza resistencia.",
    r: "Dos módulos verticales independientes que pueden intercambiar su ubicación según el espacio. Integra colgado de prendas, almacenamiento y organización general.",
    rol: "Interpretar las necesidades del cliente, desarrollar el modelo 3D, elaborar la documentación técnica y coordinar la información para el proveedor de la estructura metálica.",
    imgs: [["closet-ref.jpg", "Referencia entregada por el cliente"], ["closet-boceto.jpg", "Boceto"], ["closet-final.jpg", "Producto final"]] },
  cava: { t: "Cava para restaurante", linea: "Línea de mobiliario comercial (B2B)",
    d: "Cava personalizada para almacenar y organizar bebidas, copas y accesorios. Se desarrolló en madera de pino recuperada, con esquinas redondeadas y superficies revestidas con listones de madera.",
    r: "Compartimentos para botellas, copas, vasos y accesorios en una sola estructura. La puerta incorpora almacenamiento adicional sin cambiar las dimensiones generales.",
    rol: "Interpretar los requerimientos, elaborar los planos técnicos y el despiece con dimensiones, cantidades y materiales, preparar la relación de costos para la cotización y acompañar la fabricación.",
    imgs: [["cava-ref.jpg", "Referencia entregada por el cliente"], ["cava-boceto.jpg", "Boceto"], ["cava-plano.jpg", "Plano técnico"], ["cava-piezas1.jpg", "Listado de piezas (1)"], ["cava-piezas2.jpg", "Listado de piezas (2)"], ["cava-final.jpg", "Producto final"]] },
  biblio: { t: "Biblioteca empotrada", linea: "Línea de accesorios y objetos",
    d: "Biblioteca empotrada para uso residencial, a partir de dos imágenes de referencia del cliente. La propuesta busca aprovechar el espacio disponible con una solución integrada al ambiente.",
    r: "Superficies de almacenamiento y exhibición que se integran al entorno arquitectónico. El producto fabricado corresponde con la propuesta de diseño.",
    rol: "Transformar las referencias en una propuesta formal, explorar alternativas en bocetos, modelar en 3D para validar proporciones y distribución, y elaborar el plano técnico.",
    imgs: [["biblio-ref1.jpg", "Referencia 1 del cliente"], ["biblio-ref2.jpg", "Referencia 2 del cliente"], ["biblio-boceto.jpg", "Boceto"], ["biblio-3d-1.jpg", "Modelado 3D (1)"], ["biblio-3d-2.jpg", "Modelado 3D (2)"], ["biblio-plano.jpg", "Plano técnico"], ["biblio-final.jpg", "Producto final"]] },
  tipi: { t: "Tipi para gato", linea: "Línea para mascotas",
    d: "Refugio y espacio de descanso para gato en el hogar. A partir de la referencia del cliente se definieron geometría, dimensiones, configuración de piezas y sistema de ensamble para garantizar estabilidad.",
    r: "Un tipi funcional y estable que conserva la geometría planteada y se integra al espacio residencial.",
    rol: "Análisis formal y constructivo de la referencia, definición de dimensiones y ensamble, y elaboración de los planos de fabricación.",
    imgs: [["tipi-ref.jpg", "Referencia entregada por el cliente"], ["tipi-plano.jpg", "Plano técnico"], ["tipi-final.jpg", "Producto final"]] }
};

// Los 12 pasos. "layout" define cómo se compone la carta expandida; cada paso tiene una composición distinta.
window.PASOS = [
  { n: 1, ico: "🎯", rel: [2, 3], t: "¿Por qué esta pasantía?", s: "Motivación", datos: [["Pasantía", "modalidad de grado"], ["Taller real", "materiales y procesos"], ["Mirada crítica", "rol del pasante"]], layout: "texto-izq", img: "mesa-noche.jpg", pie: "Mesa de noche · línea hogar · @ecodeco_co",
    lead: "La pasantía se eligió como modalidad de trabajo de grado para entender, de forma directa, cómo ejerce un diseñador industrial dentro del sector productivo.",
    b: ["Articular los conocimientos académicos con situaciones reales de diseño, producción y manufactura.", "Trabajar en un entorno donde el diseño tiene relación directa con materiales, procesos de fabricación y dinámicas productivas.", "EcoDeco fue elegida por su enfoque: mobiliario a partir de madera recuperada, sostenibilidad y economía circular.", "Observar con mirada crítica el rol del diseñador en formación y las condiciones en que se desarrolla su práctica."] },

  { n: 2, ico: "🏭", rel: [6, 8], t: "EcoDeco Diseño Sostenible", s: "La empresa", datos: [["Cali", "taller y fábrica"], ["Pino de estibas", "materia prima"], ["4", "líneas de producto"], ["A medida", "cada pieza es única"]], layout: "galeria-izq", galeria: [["mesa-noche.jpg", "Hogar y organización"], ["comedor.jpg", "Comercial (B2B)"], ["porta-matera.jpg", "Accesorios y objetos"], ["camita.jpg", "Mascotas"]],
    lead: "Taller de diseño y fabricación de mobiliario ubicado en Cali. Produce piezas funcionales y decorativas a medida, elaboradas principalmente con madera de pino recuperada de estibas.",
    b: ["Servicios: propuestas de diseño personalizadas, planos técnicos, modelado 3D, fabricación en madera recuperada y acompañamiento en entrega e instalación cuando se requiere.", "Cuatro líneas de producto: hogar y organización · comercial (B2B) · accesorios y objetos · mascotas.", "Cada pieza es única por las condiciones del material recuperado y el proceso manual de fabricación.", "Promueve una cultura de consumo responsable y la reutilización de recursos."] },

  { n: 3, ico: "❓", rel: [7, 10], t: "Problemática", s: "Formación y operación", layout: "banner", img: "comedor.jpg", pie: "Comedor · producción de EcoDeco · @ecodeco_co",
    lead: "En una pequeña empresa, diseño y producción están estrechamente integrados. El diseñador en formación entra directo al flujo productivo y combina tareas técnicas con el desarrollo de producto.",
    b: ["El aprendizaje ocurre al mismo tiempo que la ejecución de actividades operativas.", "El pasante traduce referencias visuales del cliente en soluciones técnicas viables para el taller.", "Se hace necesario reconocer el trabajo del estudiante y delimitar con claridad sus funciones."],
    cita: "¿De qué manera las dinámicas productivas en una pequeña empresa manufacturera influyen en la delimitación del rol del diseñador industrial en formación durante el desarrollo de una pasantía, en relación con el equilibrio entre formación académica y participación operativa en el proceso de producción?" },

  { n: 4, ico: "🧭", rel: [9], t: "Objetivos", s: "General y específicos", layout: "tarjetas",
    lead: "Objetivo general: analizar el rol del diseñador industrial en formación dentro de EcoDeco Diseño Sostenible, a partir de la experiencia de pasantía y su participación en actividades de diseño, representación técnica y procesos de producción.",
    tarjetas: [["Describir", "las actividades desarrolladas durante la pasantía dentro de los procesos de diseño y fabricación de mobiliario."], ["Identificar", "las funciones técnicas y operativas asumidas por el diseñador en formación dentro del flujo productivo."], ["Analizar", "la relación entre el proceso de formación académica y las dinámicas productivas del entorno laboral."], ["Reconocer", "el aporte del diseño industrial dentro de los procesos de producción y desarrollo de mobiliario."]],
    nota: "Objetivo personal: fortalecer las competencias técnicas y profesionales mediante la participación en procesos reales de diseño y producción." },

  { n: 5, ico: "📅", rel: [6], t: "Cronograma", s: "Cuatro fases", layout: "linea-tiempo", img: "biblio-boceto.jpg", pie: "Boceto de la biblioteca empotrada · Autor",
    lead: "La pasantía se proyectó del 21 de diciembre de 2025 al 21 de abril de 2026. Por ajustes de disponibilidad, se ejecutó hasta el 20 de febrero de 2026, cumpliendo las actividades principales.",
    fases: [["Adaptación", "Inmersión en el taller: dinámica operativa, flujo de producción, herramientas y relación entre diseño y fabricación."], ["Aprendizaje", "Modelado 3D, planos técnicos, interpretación de referencias y criterios de fabricación de la empresa."], ["Práctica", "Modelado de piezas, documentación técnica, apoyo en carpintería y resolución de requerimientos de fabricación."], ["Evaluación", "Revisión de modelos, planos y soluciones técnicas para consolidar el aprendizaje y su impacto en la producción."]] },

  { n: 6, ico: "🔄", rel: [2, 8], t: "Metodología", s: "Flujo de trabajo de EcoDeco", layout: "imagen-protagonista", img: "flujo-ecodeco.jpg", pie: "Flujo de trabajo de EcoDeco Diseño Sostenible · Autor",
    lead: "Un flujo continuo desde la atención al cliente hasta la entrega. Las piezas de catálogo siguen una ruta directa; los pedidos personalizados suman diseño, validación con el cliente y, a veces, estructuras metálicas tercerizadas.",
    chips: ["Atención al cliente", "Catálogo o personalizado", "Modelo 3D y planos", "Selección de madera", "Fabricación y acabados", "Entrega o instalación"],
    nota: "El diseñador interviene sobre todo en la ruta personalizada: interpreta requerimientos, modela, documenta y acompaña la fabricación." },

  { n: 7, ico: "📚", rel: [10], t: "Marco teórico", s: "Cuatro autores", layout: "autores",
    lead: "Cuatro miradas para leer la experiencia: el diseño ligado a la producción, el aprendizaje desde la práctica, la responsabilidad del diseñador y las condiciones de trabajo.",
    autores: [["Gui Bonsiepe", "1978", "Diseño industrial en contextos productivos", "El diseño industrial se diferencia de las artes aplicadas por su relación con los sistemas de producción. Todo producto surge de la interacción entre usuario, tecnología y contexto de fabricación."], ["David A. Kolb", "1984", "Formación profesional y pasantías", "Aprendizaje experiencial: experiencia concreta, observación reflexiva, conceptualización y experimentación activa. La pasantía es un espacio de transición entre la universidad y el ejercicio profesional."], ["Victor Papanek", "1971", "Relación entre diseño y producción", "El diseñador tiene una responsabilidad ética y técnica frente a los sistemas de producción. El diseño debe responder a problemas reales y adaptarse a las condiciones existentes."], ["Guy Standing", "2013", "Rol del diseñador industrial", "El concepto de precariado describe condiciones de inseguridad, ausencia de garantías y reconocimiento limitado. Permite pensar la pasantía como un equilibrio entre aprendizaje y participación productiva."]],
    antecedentes: [["Práctica empresarial y competencias", "Ramírez León (2019) · Burbano Pantoja, Mendoza Vargas y Mendoza Vargas (2025)"], ["Economía circular y diseño", "Jiménez Vega, Hernández Villamizar y López Rodríguez (2020) · Reyes Forero (2021) · Buraglia Osorio (2021) · Vargas Vanegas, Ocampo Cárdenas y Parra Rincón (2024)"], ["Marco normativo de las pasantías", "Ley 789 de 2002 · Cortés Robayo (2017) · Partido Cambio Radical (2021) · OIT (2015)"], ["Estado de la técnica", "Gaitán Cruz (2017) · Gómez Gallego (2017) · Álvarez Masson (2021) · Armas Crespo (2023) · Gómez Burbano (2020) · Muñoz Varela (2025)"]] },

  { n: 8, ico: "🪑", rel: [9, 6], t: "Cuatro proyectos", s: "Un caso por línea de producto", layout: "proyectos",
    lead: "Durante la pasantía se participó en alrededor de 30 proyectos. Se presentan cuatro casos representativos, uno por línea. Toca un proyecto para ver su proceso: referencia, boceto, modelado, plano y producto final." },

  { n: 9, ico: "💡", rel: [8, 12], t: "Hallazgos", s: "El aporte del diseño", datos: [["~30", "proyectos"], ["4", "líneas"], ["3D + planos", "herramientas clave"]], layout: "imagen-alta-izq", img: "cava-final.jpg", pie: "Cava para restaurante · producto final · Autor",
    lead: "El diseñador industrial no solo propone formas: interpreta requerimientos, resuelve problemas constructivos, optimiza procesos y acompaña la fabricación.",
    b: ["El modelo 3D permite detectar inconsistencias antes de producir y comunicarse con el cliente y con el taller.", "Los planos técnicos reducen errores de fabricación y facilitan la planificación.", "Adaptar el diseño a la madera recuperada y a las capacidades del taller es una decisión técnica constante.", "El diseño es un elemento estratégico: conecta las necesidades del cliente con las posibilidades de fabricación."] },

  { n: 10, ico: "⚖️", rel: [7, 11], t: "Lo que preocupa", s: "Pasantía y dignidad laboral", layout: "manifiesto", img: "biblio-final.jpg", pie: "Biblioteca empotrada · producto final · Autor",
    lead: "La experiencia dejó ver una situación recurrente en pequeñas y medianas empresas: la dificultad para diferenciar el carácter formativo de la pasantía de las necesidades operativas de la organización.",
    b: ["El pasante asume responsabilidades que generan aportes reales, sin espacios estructurados de aprendizaje, seguimiento o reconocimiento equivalentes.", "La legislación colombiana no obliga a remunerar las pasantías universitarias realizadas como requisito de grado; la Ley 789 de 2002 regula el contrato de aprendizaje, que es una figura distinta.", "La Organización Internacional del Trabajo (2015) advierte que, sin acompañamiento formativo, la pasantía puede convertirse en trabajo encubierto.", "El diseño sigue percibiéndose, en ocasiones, como una función operativa o de apoyo, y no como un aporte estratégico."],
    frase: "La pasantía puede llegar a convertirse en un mecanismo para suplir necesidades laborales bajo condiciones que priorizan la productividad sobre el aprendizaje." },

  { n: 11, ico: "🛠️", rel: [10, 12], t: "Recomendaciones", s: "Cuatro propuestas para EcoDeco", layout: "numeradas", img: "cava-piezas1.jpg", pie: "Listado de piezas de la cava · Autor",
    lead: "Oportunidades de mejora identificadas durante la pasantía, tanto para la gestión de los proyectos como para la participación del diseñador en la empresa.",
    b: [["Fortalecer la documentación técnica", "Consolidar el uso de modelos 3D y planos estandarizados como medio de comunicación entre diseño y producción."], ["Implementar el seguimiento de proyectos", "Registrar el estado de cada proyecto, los cambios solicitados por los clientes y las modificaciones hechas en fabricación."], ["Delimitar las funciones del pasante", "Definir alcances y responsabilidades acordes con los objetivos formativos, para equilibrar aprendizaje y operación."], ["Abrir espacios de retroalimentación", "Programar seguimientos periódicos entre la empresa y el pasante para evaluar avances y resolver dificultades."]] },

  { n: 12, ico: "✅", rel: [9, 10], t: "Conclusiones", s: "Cierre", layout: "cierre", img: "tipi-final.jpg", pie: "Tipi para gato · producto final · Autor",
    lead: "El diseñador industrial cumple un papel fundamental en los procesos productivos de las pequeñas empresas manufactureras. Reconocer ese aporte es también reconocer al diseñador en formación.",
    b: ["El diseño facilita la comunicación entre las necesidades del cliente y las posibilidades de fabricación.", "La documentación técnica, el modelado 3D y el conocimiento de los procesos contribuyen a la eficiencia y la calidad.", "Existe una tensión real entre el carácter formativo de la pasantía y las necesidades operativas de la empresa.", "Hay que fortalecer la relación entre la academia y el sector productivo sin perder de vista los objetivos formativos."],
    gracias: "Gracias" }
];

window.REFERENCIAS = [
  "Álvarez Masson, J. M. (2021). MOEK – Diseño de mobiliario con implementación tecnológica (CAD-CAM y CNC) hacia la generación de identidad a partir de la apropiación de texturas semióticamente relacionadas con Colombia [Trabajo de grado, Universidad El Bosque].",
  "Armas Crespo, V. (2023). Ensambles digitales de madera: embrión para un diseño de mobiliario sostenible. Cuadernos del Centro de Estudios de Diseño y Comunicación, (216).",
  "Bonsiepe, G. (1978). Teoría y práctica del diseño industrial: elementos para una manualística crítica. Gustavo Gili.",
  "Buraglia Osorio, M. (2021). El diseño como estrategia de circularidad en el aprovechamiento de residuos agroindustriales. Designia, 8, 131–151.",
  "Burbano Pantoja, V. M. A., Mendoza Vargas, J. M., & Mendoza Vargas, H. H. (2025). Pasantía profesional y desarrollo de habilidades emprendedoras en el centro de innovación empresarial Tunja-Colombia. Revista Virtual Universidad Católica del Norte.",
  "Congreso de la República de Colombia. (2002). Ley 789 de 2002. Diario Oficial No. 45.046.",
  "Cortés Robayo, L. (2017). Prácticas: el contrato de aprendizaje y la pasantía. Asuntos Legales.",
  "Ecodeco. Nuestra esencia. https://ecodeco.com.co/nuestra-esencia/",
  "Gaitán Cruz, I. H. (2017). Plan de negocios para la creación de una empresa dedicada al diseño, fabricación y comercialización de mobiliario hecho a partir de material reciclado (madera) [Trabajo de grado, Universidad Distrital Francisco José de Caldas].",
  "Gómez Burbano, K. A. (2020). Diseño industrial del proceso de fabricación de madera aglomerada con base en los residuos de la producción de café en el municipio de Cajibío, Cauca. Encuentro Internacional de Educación en Ingeniería ACOFI.",
  "Gómez Gallego, J. S. (2017). Diseño de producto en el sector industrial y comercial de madera y muebles [Trabajo de grado, Universidad Católica de Pereira].",
  "Jiménez Vega, R., Hernández Villamizar, J., & López Rodríguez, S. (2020). Economía circular, aproximación a un modelo para Pymes exportadoras. Revista Colombiana de Ciencias Administrativas, 2(1), 62–77.",
  "Kolb, D. A. (1984). Experiential learning: Experience as the source of learning and development. Prentice-Hall.",
  "Muñoz Varela, A. (2025). Cómo el diseño industrial transforma los desperdicios de los troqueles curvos de madera de la postproducción en oportunidades y/o productos de valor para la empresa Cripack [Trabajo de grado, Universidad Autónoma de Occidente].",
  "Organización Internacional del Trabajo. (2015). Pasantías: ¿una oportunidad o una trampa laboral?",
  "Papanek, V. (1971). Design for the real world: Human ecology and social change. Pantheon Books.",
  "Partido Cambio Radical. (2021). Cambio Radical impulsa proyecto de ley que busca establecer el pago obligatorio de las pasantías universitarias.",
  "Ramírez León, C. (2019). La práctica empresarial en el ámbito del Diseño Industrial. Una mirada retrospectiva. Arquetipo.",
  "Reyes Forero, I. A. (2021). Estrategias de diseño de producto para una economía circular. ACTIO Journal of Technology in Design, Film Arts and Visual Communication, 5(1).",
  "Standing, G. (2013). El precariado: una nueva clase social. Pasado y Presente.",
  "Vargas Vanegas, C., Ocampo Cárdenas, H., & Parra Rincón, D. M. (2024). Economía sostenible: análisis de la cadena de valor en PYMES. Dosquebradas-Colombia. Revista Venezolana de Gerencia, 29(107), 1010–1024."
];
