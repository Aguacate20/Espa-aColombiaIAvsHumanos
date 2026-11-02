# Libro de códigos

**Documento interno. No debe publicarse en el sitio ni verlo ningún participante.**

## Situaciones

Los ids están intercalados deliberadamente: el número no guarda relación con el nivel.

| id | Nivel | Enunciado (CO) |
|---|---|---|
| S01 | mediacion | Discutí con alguien y no logro entender por qué reaccionó como reaccionó… *(adaptado ES)* |
| S02 | epistemica | Mejor época del año para viajar a otro país |
| S03 | autotelica | Jugar o inventar algo con alguien por el puro gusto |
| S04 | epistemica | Año exacto en que se inventó el bombillo *(adaptado ES: bombilla)* |
| S05 | mediacion | A mitad de una conversación: ¿seguir con el tema o dejarlo? |
| S06 | autotelica | Hacer algo entretenido con alguien, los dos aportando |
| S07 | mediacion | Decir algo que puede sonar más duro de lo que quiero |
| S08 | epistemica | Qué formación tiene mejores oportunidades laborales |
| S09 | mediacion | A mitad de un intercambio de mensajes: cómo plantear lo que sigue |
| S10 | autotelica | Compañía durante algo rutinario, sin hablar todo el tiempo |
| S11 | epistemica | Alimento fuera de la nevera toda la noche |
| S12 | mediacion | Quedó algo mal dicho de mi parte: cómo lo aclaro |
| S13 | epistemica | Me ofrecieron un trabajo: ¿me conviene aceptarlo? |
| S14 | autotelica | Conversar largo sin más motivo que la conversación |
| S15 | epistemica | Quién es el mejor jugador de fútbol del mundo |
| S16 | autotelica | Alguien ahí mientras paso el rato, sin plan |
| S17 | mediacion | Decir algo importante y no tener claro que lo entienda |
| S18 | autotelica | Contar cómo estuvo mi día y que el otro cuente el suyo |
| S19 | epistemica | Cláusula de contrato que pueda perjudicarme |
| S20 | autotelica | Acompañarnos mutuamente en algo que cada uno disfruta |
| S21 | mediacion | Prepararme para una conversación difícil pendiente |
| S22 | autotelica | Conversaciones que se alargan solas |
| S23 | epistemica | Sembrar un limonero: qué cuidados necesita *(ES: plantar)* |
| S24 | autotelica | Imaginar historias o situaciones absurdas, mitad y mitad |
| S25 | mediacion | A mitad de mensajes: no me queda claro qué me quiere decir |
| S26 | epistemica | ¿Invertir tiempo en otro idioma o dedicarlo a otra cosa? |
| S27 | mediacion | Acabo de terminar la conversación: ¿dejar el tema o volver a sacarlo? |
| P01 | — | Práctica (bloque `practice`, excluir del análisis) |

**Recuento:** 9 epistémicas · 9 mediación · 9 autotélicas.

## CEIA-9

| Subescala | Ítems | Constructo |
|---|---|---|
| AP | AP1–AP6 | Autenticidad percibida |
| VE | VE1–VE6 | Validación emocional |
| RA | RA1–RA6 | Reconocimiento afectivo |
| VS | VS1–VS6 | Vínculo socioemocional |

Likert 1–5. Sin ítems inversos. Se registra `page_rt_ms` por página (6 ítems).

## DERS-SF (`scale = 'DERSSF'`, sustituye a ERQ10)

Mismos 18 ítems en los dos países; cambia la redacción validada: CO = Navarro et al. (2021), ES = Gómez-Simón et al. (2014). Likert 1–5 (casi nunca → casi siempre). Puntuación alta = más dificultad.

| Subescala | Ítems (código · ítem DERS-36) | Constructo |
|---|---|---|
| AWA | DERS1 [2], DERS4 [8], DERS6 [10] — **inversos** (`reverse_scored = true`, recodificar 6 − valor) | Falta de conciencia emocional |
| CLA | DERS2 [4], DERS3 [5], DERS5 [9] | Falta de claridad |
| NAC | DERS7 [12], DERS12 [25], DERS16 [29] | No aceptación |
| GOA | DERS8 [13], DERS11 [18], DERS13 [26] | Dificultad con metas |
| IMP | DERS9 [14], DERS14 [27], DERS17 [32] | Dificultad con impulsos |
| STR | DERS10 [16], DERS15 [28], DERS18 [35] | Acceso limitado a estrategias |

`value` guarda siempre la respuesta cruda; `v_scale_scores` ya aplica la recodificación. AWA suele mostrar baja fiabilidad y baja correlación con el resto (Navarro et al., 2021): analizarla aparte del total.

## Dispositivo (`participants`, registrado tras el consentimiento)

| Columna | Origen | Nota |
|---|---|---|
| `device_reported` | Pregunta al participante | pc / movil / tableta |
| `device_detected` | Clasificación automática | pc / movil / tableta, a partir del puntero, la pantalla y el user agent |
| `pointer_coarse` | `matchMedia('(pointer: coarse)')` | true = puntero principal táctil |
| `any_pointer_coarse` / `any_pointer_fine` | `matchMedia('(any-pointer: …)')` | detecta equipos con táctil y ratón |
| `hover_none` | `matchMedia('(hover: none)')` | |
| `max_touch_points` | `navigator.maxTouchPoints` | |
| `screen_w/h`, `viewport_w/h` | px CSS | tamaño de pantalla y del área visible al responder |
| `device_pixel_ratio`, `orientation`, `ua_mobile`, `platform`, `user_agent` | navegador | |

Sugerencia de covariable para el DDM: `device_reported`; contrastar con `device_detected` y `pointer_coarse` para detectar respuestas incoherentes.

## Variables de `trials`

| Columna | Rango | Nota |
|---|---|---|
| `slider_value` | 0–100 | Posición cruda. 0 = extremo izquierdo **de la pantalla**. Depende del lado: no usar directamente. |
| `preference_ia` | 0–100 | Ya corregido por el lado. 100 = máxima preferencia por la IA. **Esta es la variable de análisis.** |
| `choice` | ia / humano / neutral | Dicotomización de `preference_ia` respecto a 50. |
| `rt_ms` | ms | Desde el render de la situación hasta confirmar la elección (incluye el arrastre). |
| `first_move_ms` | ms | Desde el render hasta el **primer** movimiento del slider. Alternativa de RT para el DDM sin el tiempo motor del arrastre. |
| `input_pointer_type` | mouse / touch / pen / keyboard | Modalidad con la que se movió el slider en ese ensayo. |
| `slider_moves` | entero | Número de ajustes antes de confirmar. Proxy de vacilación. |
| `confidence` | 0–10 | Confianza declarada en la opción elegida. |
| `confidence_rt_ms` | ms | Latencia de la valoración de confianza. |
| `left_agent` / `right_agent` | ia / humano | Contrabalanceado dentro de cada participante. |
| `situation_category` | epistemica / mediacion / autotelica | Escrita por el servidor. Nunca visible para el participante. |

## Exclusiones sugeridas

- `block = 'practice'` (siempre).
- `rt_ms < 400` — respuesta anterior a la lectura del enunciado.
- Participantes con `finished_at is null` y menos de 27 ensayos, según el criterio que preregistréis.
- `slider_moves = 1` en más del 90 % de los ensayos con `preference_ia` constante — patrón de respuesta plana.
