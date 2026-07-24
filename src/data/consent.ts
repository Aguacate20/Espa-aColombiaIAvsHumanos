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
        "1. Datos sociodemográficos. Edad, sexo, nivel educativo, ocupación, uso de pantallas y de herramientas de inteligencia artificial. Aproximadamente 3 minutos.",
        "2. Cuestionarios. Una serie de escalas sobre su experiencia con la inteligencia artificial, sus relaciones sociales y la manera en que maneja sus emociones. Se responden marcando la opción que mejor lo describe. Aproximadamente 15 a 20 minutos.",
        "3. Tarea experimental. Verá 27 situaciones cotidianas. En cada una indicará a quién acudiría, moviendo una barra hacia una de dos opciones, y después señalará cuánta confianza tiene en la opción que eligió. Aproximadamente 10 a 15 minutos.",
      ],
    },
    {
      heading: "Cuánto dura",
      body: [
        "Entre 30 y 40 minutos en total. No tiene que hacerlo de una sola vez: si cierra la ventana, puede retomar exactamente donde quedó ingresando de nuevo su nombre y número de documento en la página de inicio.",
      ],
    },
    {
      heading: "Qué información se registra",
      body: [
        "Sus respuestas a los cuestionarios, la posición exacta en la que deja la barra en cada situación y el tiempo que tarda en responder cada pantalla. El tiempo de respuesta forma parte del análisis y por eso le pedimos que responda a su ritmo natural, sin apurarse ni detenerse más de lo necesario.",
        "No se graba audio ni video. No se accede a su cámara, micrófono, contactos ni archivos. No se recoge información de su dispositivo más allá del tipo de navegador.",
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
        "Toda la información se manejará bajo principios de confidencialidad y anonimato. Su nombre y su número de documento se utilizan únicamente para identificar su sesión y permitirle retomar el cuestionario si lo interrumpe.",
        "Antes de cualquier análisis, sus datos se codifican: se sustituyen su nombre y su documento por un código de participante, de modo que el equipo trabaja sin saber a quién corresponde cada respuesta. Ni su nombre ni su documento aparecerán en ninguna publicación, presentación o base de datos compartida.",
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
      heading: "Protección de datos (Reglamento (UE) 2016/679)",
      body: [
        "Responsable del tratamiento: [PENDIENTE — completar con el responsable designado por la Universitat de València].",
        "Finalidad: realización del estudio científico descrito en este documento. Base jurídica: el consentimiento del interesado (art. 6.1.a RGPD) y el tratamiento con fines de investigación científica (art. 9.2.j RGPD).",
        "Conservación: los datos identificativos se suprimen una vez finalizada la recogida y codificación; los datos anonimizados se conservan indefinidamente con fines de investigación.",
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
