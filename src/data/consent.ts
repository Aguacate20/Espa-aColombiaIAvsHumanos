import type { Country } from "./copy";

export interface ConsentSection {
  heading: string;
  body: string[];
}

const RESEARCHER = {
  name: "Johan Sebastián Galindez Acosta",
  phone: "+57 310 381 7021",
  email: "johangalac@unisabana.edu.co",
};

/** Bloques comunes a los dos países. */
function baseSections(country: Country): ConsentSection[] {
  const sections: ConsentSection[] = [
    {
      heading: "Quiénes somos",
      body: [
        "Muchas gracias por su interés en participar en este proyecto de investigación sobre decisiones emocionales y morales e inteligencia artificial.",
        "El estudio es dirigido por el investigador principal Johan Sebastián Galindez Acosta, de la Facultad de Ciencias del Comportamiento de la Universidad de La Sabana (Colombia), en colaboración con la Universitat de València (España).",
      ],
    },
    {
      heading: "Para qué se hace este estudio",
      body: [
        "Queremos entender a quién prefieren acudir las personas cuando necesitan ayuda en distintas situaciones cotidianas: a otra persona o a un sistema de inteligencia artificial. También queremos conocer qué características personales explican esa preferencia.",
        "No estamos evaluando su desempeño, sus conocimientos ni su personalidad. No hay respuestas correctas ni incorrectas.",
      ],
    },
    {
      heading: "Qué se le pedirá que haga",
      body: [
        "1. Datos sociodemográficos. Edad, sexo, nivel educativo, ocupación, uso de pantallas y de herramientas de inteligencia artificial, y el tipo de dispositivo desde el que responde. Aproximadamente 3 minutos.",
        "2. Cuestionarios. Una serie de escalas sobre su experiencia con la inteligencia artificial, sus relaciones sociales y la manera en que maneja sus emociones. Se responden marcando la opción que mejor lo describe. Aproximadamente 15 a 20 minutos.",
        "3. Tarea experimental. Verá 27 situaciones cotidianas. En cada una indicará a quién acudiría, moviendo una barra hacia una de dos opciones, y después señalará cuánta confianza tiene en la opción que eligió. Aproximadamente 10 a 15 minutos.",
      ],
    },
    {
      heading: "Cuánto dura",
      body: [
        "Entre 30 y 40 minutos en total. No tiene que hacerlo de una sola vez: si cierra la ventana, puede retomar exactamente donde quedó abriendo de nuevo el enlace del estudio desde el mismo dispositivo y navegador.",
      ],
    },
    {
      heading: "Qué información se registra",
      body: [
        "Sus respuestas a los cuestionarios, la posición exacta en la que deja la barra en cada situación y el tiempo que tarda en responder cada pantalla. El tiempo de respuesta forma parte del análisis y por eso le pedimos que responda a su ritmo natural, sin apurarse ni detenerse más de lo necesario.",
        "También se registran características técnicas del dispositivo que pueden influir en los tiempos de respuesta: si es un computador, un celular o una tableta; si se usa pantalla táctil o ratón; el tamaño de la pantalla y el tipo de navegador. Estos datos no permiten identificarle.",
        "No se graba audio ni video. No se accede a su cámara, micrófono, contactos, ubicación ni archivos.",
      ],
    },
    {
      heading: "Riesgos e incomodidades",
      body: [
        "Este estudio no implica riesgos físicos. Algunas preguntas se refieren a emociones, soledad y relaciones personales, y es posible que le resulten incómodas. Puede omitir la participación o retirarse en cualquier momento.",
        "Si al responder identifica un malestar emocional que quisiera atender, puede escribir al correo de contacto y le indicaremos servicios de apoyo psicológico disponibles.",
      ],
    },
    {
      heading: "Beneficios y compensación",
      body: [
        "No hay compensación económica ni beneficio personal directo por participar. Su participación contribuye a comprender cómo las personas están incorporando la inteligencia artificial en decisiones cotidianas. Si lo desea, puede solicitar un resumen de los resultados generales al correo de contacto.",
      ],
    },
    {
      heading: "Confidencialidad y manejo de los datos",
      body: [
        "La participación es anónima. No se le pedirá su nombre, su número de documento, su correo ni ningún otro dato que permita identificarle. Su sesión se asocia únicamente a un código de participante generado al azar y guardado en su navegador, que permite retomar el estudio desde el mismo dispositivo.",
        "Como no se recogen datos identificativos junto con las respuestas, el equipo investigador no puede saber a quién corresponde cada una.",
        "Los datos se almacenan en servidores con acceso restringido y cifrado, y solo el equipo investigador tiene acceso. Los resultados se publicarán de forma agregada, sin que sea posible identificar a ninguna persona. Los datos ya anonimizados podrán depositarse en un repositorio científico de acceso abierto con fines de verificación y reutilización académica.",
      ],
    },
    {
      heading: "Participación voluntaria",
      body: [
        "Su participación es completamente voluntaria. En cualquier momento puede decidir si continúa o se retira del estudio, sin ningún tipo de sanción o perjuicio, y sin tener que dar explicaciones. Basta con cerrar la ventana.",
        "Si después de participar quiere que sus datos se eliminen, escriba al correo de contacto indicando su código de participante y procederemos a borrarlos.",
      ],
    },
    {
      heading: "Requisito de edad",
      body: ["Para participar debe ser mayor de 18 años."],
    },
  ];

  if (country === "ES") {
    sections.push({
      heading: "Puntos de clase (NPA)",
      body: [
        "Si participa en el marco de una asignatura, al terminar todas las situaciones del estudio podrá indicar su NPA (Número Personal del Alumno) para que se le asignen los puntos de clase. Esa pantalla solo se habilita después de completar el estudio.",
        "El NPA se guarda por separado de las respuestas, en una tabla independiente, sin ningún código, fecha ni dato que permita relacionarlo con lo que usted respondió. El profesorado recibirá únicamente la lista de NPA de quienes completaron el estudio y no tendrá acceso a ninguna respuesta. Indicar el NPA es voluntario.",
      ],
    });
    sections.push({
      heading: "Protección de datos (Reglamento (UE) 2016/679)",
      body: [
        "Responsable del tratamiento: [PENDIENTE — completar con el responsable designado por la Universitat de València].",
        "Finalidad: realización del estudio científico descrito en este documento. Base jurídica: el consentimiento del interesado (art. 6.1.a RGPD) y el tratamiento con fines de investigación científica (art. 9.2.j RGPD).",
        "Conservación: las respuestas se recogen de forma anónima y se conservan con fines de investigación. La lista de NPA se conserva solo hasta que se asignen los puntos de clase y después se suprime.",
        "Derechos: puede ejercer sus derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición escribiendo al correo de contacto, así como presentar una reclamación ante la Agencia Española de Protección de Datos.",
        "Delegado de Protección de Datos: [PENDIENTE — completar con los datos del DPD de la Universitat de València].",
      ],
    });
  }

  sections.push({
    heading: "Contacto",
    body: [
      `Investigador principal: ${RESEARCHER.name}`,
      `Celular: ${RESEARCHER.phone}`,
      `Correo: ${RESEARCHER.email}`,
      country === "CO"
        ? "Comité de Ética en Investigación, Universidad de La Sabana: [PENDIENTE — completar número de acta y fecha de aprobación]."
        : "Comité de Ética en Investigación: [PENDIENTE — completar el comité que avala la recogida en España, número de acta y fecha].",
    ],
  });

  return sections;
}

export function consentFor(country: Country) {
  return {
    title: "Consentimiento informado",
    lead: "Lea con atención antes de continuar. Puede volver a esta página en cualquier momento desde el enlace del pie.",
    sections: baseSections(country),
    checkboxLabel:
      "He leído y comprendido la información anterior, soy mayor de 18 años y acepto participar voluntariamente en este estudio.",
    accept: "Acepto y quiero participar",
    decline: "No deseo participar",
  };
}
