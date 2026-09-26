# Tema 1 — Sistemas de Información
### Administración de Sistemas

Este tema introduce tres ideas fundamentales de la asignatura: **qué es un sistema de información**, cómo se materializa tecnológicamente mediante un **Centro de Procesamiento de Datos (CPD)** y cuál es el papel del **administrador de sistemas**. :chatgpt-content-reference{index="0"}

---

# 1. Sistemas de Información

## 1.1. ¿Qué es un Sistema de Información?

Los **Sistemas de Información (SI)** tienen cada vez más importancia dentro de las organizaciones. La globalización y el paso hacia una economía basada en el conocimiento han hecho que las **Tecnologías de la Información y la Comunicación (TIC)** sean un elemento esencial.

Un cambio especialmente importante es la relación entre tecnología y estrategia empresarial:

> **Antes:** la estrategia empresarial determinaba qué tecnologías se utilizaban.  
> **Actualmente:** las TIC también pueden **condicionar la propia estrategia empresarial**. :chatgpt-content-reference{index="1"}

### Definición

Un **Sistema de Información** puede entenderse como:

> Un conjunto de elementos interrelacionados cuya finalidad es **capturar datos, almacenarlos y transformarlos** para proporcionar la información adecuada, a la persona adecuada y en el momento adecuado, permitiéndole tomar una decisión o realizar una operación. :chatgpt-content-reference{index="2"}

La idea puede simplificarse así:

```text
DATOS
  │
  ▼
┌─────────┐
│ Entrada │
└────┬────┘
     ▼
┌────────────┐
│ Procesado  │
└─────┬──────┘
      ▼
┌────────┐
│ Salida │
└────────┘
      │
      ▼
INFORMACIÓN ÚTIL
```

Además, el sistema puede mantener los datos mediante **almacenamiento centralizado**, tal y como representa el esquema de la página 9. :chatgpt-content-reference{index="3"}

### Ejemplo sencillo

Imagina el sistema de una tienda:

```text
Dato:
"Se han vendido 37 portátiles."

              ↓ procesado

Información:
"Las ventas de portátiles han aumentado un 23 % respecto
al mes anterior."

              ↓ experiencia + interpretación

Conocimiento:
"Deberíamos aumentar el stock de portátiles."
```

Esto nos lleva a una distinción fundamental del tema.

---

## 1.2. Datos, información y conocimiento

### Dato

Un **dato** representa un hecho que todavía no ha sido procesado. Puede expresarse mediante números, letras u otros símbolos.

Por ejemplo:

```text
37
```

Por sí solo tiene poco significado.

### Información

La **información** aparece cuando los datos se **procesan, agregan y presentan** de una forma útil para alguien.

Por eso, el tema resume la información como:

> **Datos dotados de relevancia.** :chatgpt-content-reference{index="4"}

Por ejemplo:

```text
37 → "Hoy se han vendido 37 ordenadores."
```

Ahora sabemos qué representa el dato.

### Conocimiento

El **conocimiento** aparece cuando una persona transforma la información mediante su **experiencia e interpretación**.

```text
DATOS
  │ procesamiento
  ▼
INFORMACIÓN
  │ experiencia
  ▼
CONOCIMIENTO
```

El conocimiento se produce principalmente en la mente humana, por lo que depende especialmente de las dimensiones **humana y organizativa** del SI. :chatgpt-content-reference{index="5"}

### 🧠 Idea clave para memorizar

**Dato = hecho bruto.**  
**Información = dato procesado y relevante.**  
**Conocimiento = información interpretada mediante la experiencia.**

---

# 2. Importancia de las TIC en las organizaciones

Las TIC pueden modificar la competencia entre empresas de tres maneras fundamentales:

1. **Crear ventajas competitivas**, proporcionando nuevas herramientas para superar a los competidores.
2. **Modificar la estructura de un sector** y sus reglas de competencia.
3. **Permitir nuevos modelos de negocio basados en información.** :chatgpt-content-reference{index="6"}

Por tanto, la informática no debe entenderse simplemente como un soporte técnico de una empresa.

```text
Empresa
   │
   ├── Personas
   ├── Organización
   └── Tecnología
          │
          ▼
  Sistema de Información
```

De hecho, el diseño de un SI requiere una perspectiva **multidisciplinar** formada por tres dimensiones:

| Dimensión | Se ocupa de |
|---|---|
| **Humana** | Personas que utilizan, administran o interpretan el sistema |
| **Tecnológica** | Hardware, software, redes, almacenamiento, etc. |
| **Organizativa** | Procesos, estructura y funcionamiento de la organización |

El diagrama de la página 7 representa precisamente el SI como la interacción de estas tres dimensiones. :chatgpt-content-reference{index="7"}

---

# 3. Calidad de la información

Tener **más información no significa necesariamente tener mejor información**.

Un exceso de información puede dificultar la toma de decisiones. Por tanto, el verdadero valor de un SI no depende únicamente de su complejidad técnica, sino de **cómo lo utiliza la organización**. :chatgpt-content-reference{index="8"}

## Características de una buena información

El tema establece **9 propiedades fundamentales**: :chatgpt-content-reference{index="9"}

| Propiedad | Significado | Ejemplo |
|---|---|---|
| **Exactitud** | Debe ser precisa y estar libre de errores. | Un saldo bancario correcto. |
| **Comprensión** | Debe ser entendible por el usuario. | Un informe claro. |
| **Completitud** | Debe incluir todos los hechos importantes. | Un informe financiero con todos los gastos. |
| **Economicidad** | Obtenerla no debe costar más que el beneficio que aporta. | No gastar 10.000 € para obtener información que ahorra 100 €. |
| **Confianza** | Sus datos y fuentes deben ser fiables. | Información procedente de una BBDD validada. |
| **Relevancia** | Debe resultar útil para tomar decisiones. | Mostrar ventas al responsable comercial. |
| **Nivel de detalle** | Debe adecuarse a la decisión que se quiere tomar. | Dirección necesita resúmenes; un técnico puede necesitar logs. |
| **Oportunidad** | Debe llegar a quien corresponde cuando la necesita. | Una alerta de caída de servidor inmediata. |
| **Verificabilidad** | Debe poder contrastarse y comprobarse. | Poder verificar el origen de una cifra. |

### ⚠️ Importante

Una información puede ser **correcta y aun así ser mala información**.

Por ejemplo, si entregamos al director de una empresa 10.000 métricas perfectamente exactas, probablemente tendrá dificultades para encontrar las realmente importantes.

El propio tema plantea el ejemplo de un cuadro de mando que aporta **demasiada información**, dificultando centrar la atención en los aspectos clave. :chatgpt-content-reference{index="10"}

---

# 4. Centro de Procesamiento de Datos (CPD)

## 4.1. ¿Qué es un CPD?

Un **Centro de Procesamiento de Datos (CPD)** o **Data Center** es una instalación que alberga los sistemas necesarios para:

- procesar información;
- almacenarla;
- transmitirla mediante redes;
- mantener estos sistemas disponibles y protegidos.

No se trata simplemente de una habitación llena de servidores.

Un CPD también necesita infraestructura especializada para proporcionar **energía fiable** y mantener unas condiciones adecuadas de **temperatura y humedad**. :chatgpt-content-reference{index="11"}

Por tanto:

```text
                    ┌──────────────┐
                    │     CPD      │
                    └──────┬───────┘
                           │
       ┌───────────────────┼────────────────────┐
       │                   │                    │
    Cómputo          Almacenamiento       Comunicaciones
  (servidores)         (storage)             (red)
       │                   │                    │
       └───────────────────┼────────────────────┘
                           │
                 Infraestructura física
                           │
            ┌──────────────┼───────────────┐
          Energía      Refrigeración    Seguridad
```

---

# 5. Componentes fundamentales de un CPD

Un CPD puede incluir:

- **servidores**;
- sistemas de **almacenamiento**;
- sistemas de **telecomunicaciones**;
- fuentes eléctricas redundantes;
- sistemas eléctricos de respaldo;
- conexiones de comunicaciones redundantes;
- aire acondicionado y control ambiental;
- detección de incendios;
- sistemas de seguridad. :chatgpt-content-reference{index="12"}

La ilustración de la página 18 muestra muy bien esta interdependencia, incluyendo elementos como **UPS, generador eléctrico, CRAC, LAN, WAN, servidores, almacenamiento y SAN**. :chatgpt-content-reference{index="13"}

### ¿Por qué tanta redundancia?

Porque el objetivo es evitar que **un único fallo provoque la caída completa del servicio**.

Por ejemplo:

```text
Red eléctrica
     │
     ▼
    UPS ─────────► mantiene temporalmente el suministro
     │
     ▼
Generador ───────► proporciona energía si el corte continúa
     │
     ▼
Servidores
```

Esta idea de disponer de alternativas aparece constantemente en administración de sistemas.

---

# 6. Evolución histórica de los CPD

Esta parte del tema es mucho más fácil de aprender si se entiende como una evolución:

```text
MAINFRAME
    ↓
MINICOMPUTADORES
    ↓
CLIENTE-SERVIDOR
    ↓
COMPUTACIÓN DISTRIBUIDA
    ↓
GRID COMPUTING
    ↓
CLUSTERS
    ↓
VIRTUALIZACIÓN
    ↓
CLOUD COMPUTING
    ↓
CONSOLIDACIÓN
```

---

## 6.1. Mainframes

Inicialmente los CPD estaban constituidos fundamentalmente por **mainframes**.

Eran grandes ordenadores instalados en salas específicas que ofrecían:

- gran potencia;
- gran velocidad;
- posibilidad de ejecutar varios sistemas operativos simultáneamente.

El principal problema era su **elevado coste**, tanto de adquisición como de puesta en funcionamiento. :chatgpt-content-reference{index="14"}

---

## 6.2. Minicomputadores

Durante las décadas de **1970 y 1980**, los minicomputadores aparecieron como alternativa.

Eran:

- más pequeños;
- más baratos;
- menos exigentes respecto a su ubicación física.

Esto permitió descentralizar parte de la capacidad informática. :chatgpt-content-reference{index="15"}

---

# 7. Cliente-servidor y computación distribuida

Los terminales utilizados para conectarse a los mainframes fueron sustituyéndose por **ordenadores personales conectados a servidores**.

Aparece así la arquitectura:

```text
CLIENTE ───────┐
               │
CLIENTE ───────┼──────► SERVIDOR
               │
CLIENTE ───────┘
```

El **cliente** solicita servicios o recursos y el **servidor** los proporciona.

Paralelamente aparecen dos conceptos importantes.

### Computación paralela

Varios dispositivos trabajan **simultáneamente** para resolver un problema.

### Computación distribuida

Varios ordenadores **independientes y conectados mediante una red** trabajan para alcanzar un objetivo común. :chatgpt-content-reference{index="16"}

La descentralización proporcionó mucha libertad, pero también aumentó la **complejidad**: diferentes propietarios podían administrar sus sistemas de manera distinta y cada fabricante podía disponer de su propio sistema operativo. El tema identifica esta evolución como el comienzo de la **computación distribuida moderna**. :chatgpt-content-reference{index="17"}

---

# 8. Grid Computing

El siguiente paso fue el **Grid Computing**.

Su idea fundamental consiste en utilizar recursos de **varios ordenadores conectados mediante Internet** para resolver conjuntamente un determinado problema.

```text
PC ──┐
PC ──┤
PC ──┼──► Recursos combinados ──► Problema
PC ──┤
PC ──┘
```

La combinación de estos recursos permite funcionar de manera similar a un gran supercomputador.

Según el tema, su auge se produjo durante los **años 90**, principalmente para aplicaciones que necesitaban una enorme cantidad de recursos dedicados. :chatgpt-content-reference{index="18"}

---

# 9. Clusters

A mediados de los años 90 aparecen los primeros **clusters**.

Un cluster es un:

> **Conjunto de ordenadores conectados mediante una red de alta velocidad que se percibe como una única unidad.**

Su finalidad puede ser mejorar:

- rendimiento;
- eficiencia;
- disponibilidad.

Además, pueden construirse utilizando hardware convencional, sin necesidad de componentes personalizados. :chatgpt-content-reference{index="19"}

### Conceptualmente

```text
        ┌── Nodo 1
        │
Usuario ├── Nodo 2
        │
        ├── Nodo 3
        │
        └── Nodo 4
             ↑
          CLUSTER

Para el exterior → un único sistema
```

---

# 10. El problema de la proliferación de servidores

La libertad para desarrollar nuevos sistemas permitió que las aplicaciones llegasen al mercado con mayor rapidez.

Pero apareció un problema:

```text
Más aplicaciones
      ↓
Más servidores
      ↓
Más infraestructura
      ↓
Más elementos que administrar
      ↓
Mayor complejidad
      ↓
Mayor coste de gestión
```

El crecimiento del número de servidores en los CPD incrementó considerablemente la complejidad y el coste de administración. :chatgpt-content-reference{index="20"}

Aquí aparece una de las soluciones más importantes de la informática moderna.

---

# 11. Virtualización

Una **máquina virtual (VM)** es una implementación mediante software de una máquina que ejecuta programas como si fuera un ordenador físico.

La virtualización permite que los recursos físicos de una máquina **host** sean compartidos entre diferentes máquinas virtuales **guest**, pudiendo ejecutar cada una su propio sistema operativo. :chatgpt-content-reference{index="21"}

Por ejemplo:

```text
┌──────────────────────────────┐
│        Servidor físico       │  ← HOST
│                              │
│ ┌────────┐ ┌────────┐ ┌────┐ │
│ │ VM 1   │ │ VM 2   │ │VM 3│ │ ← GUESTS
│ │ Linux  │ │Windows │ │Linux│ │
│ └────────┘ └────────┘ └────┘ │
└──────────────────────────────┘
```

En lugar de necesitar tres servidores físicos separados, podemos aprovechar mejor los recursos de uno.

---

# 12. Cloud Computing

Posteriormente aparece el concepto de **Cloud Computing** o computación en la nube.

Consiste en utilizar recursos informáticos **a través de Internet**, de manera flexible y pagando en función del consumo realizado. :chatgpt-content-reference{index="22"}

El tema introduce tres modelos fundamentales:

### IaaS — Infrastructure as a Service

Se proporciona **infraestructura informática** como servicio.

```text
Ejemplo conceptual:
máquinas virtuales + red + almacenamiento
```

### PaaS — Platform as a Service

Se proporciona una **plataforma** sobre la que desarrollar o ejecutar aplicaciones.

### SaaS — Software as a Service

El usuario consume directamente una **aplicación como servicio**.

### 🧠 Forma sencilla de diferenciarlos

```text
IaaS → alquilo INFRAESTRUCTURA
PaaS → alquilo una PLATAFORMA
SaaS → utilizo directamente el SOFTWARE
```

---

# 13. CPD moderno y consolidación

El tema también presenta los **CPD modulares**, señalando en 2007 este concepto como una innovación relevante y utilizando el **Proyecto Natick de Microsoft** —un CPD modular diseñado para instalarse bajo el océano— como ejemplo. :chatgpt-content-reference{index="23"}

Finalmente, la tendencia vuelve hacia la **consolidación**.

La lógica es:

```text
Menos dispositivos
        ↓
Menos elementos que administrar
        ↓
Menor complejidad
        ↓
Infraestructura más sencilla
        ↓
Administración más eficiente
```

Por tanto, consolidar no significa necesariamente volver al mainframe clásico, sino **reducir y racionalizar la infraestructura que debe administrarse**. El objetivo señalado en el tema es minimizar la complejidad del CPD y aumentar su eficiencia. :chatgpt-content-reference{index="24"}

---

# 14. El Administrador de Sistemas

## 14.1. ¿Quién es?

El **administrador de sistemas o SysAdmin** es la persona encargada de **administrar y configurar los sistemas**, además de resolver los problemas informáticos que aparecen.

Debe poseer conocimientos amplios sobre:

```text
             SYSADMIN
                │
      ┌─────────┼─────────┐
      │         │         │
   Hardware  Software   Datos
      │
   Usuarios
```

También se espera que tenga capacidad para tomar decisiones y un elevado grado de responsabilidad, especialmente porque trabaja con información importante para la organización. :chatgpt-content-reference{index="25"}

---

# 15. Estrategias de un buen administrador

Esta es una de las partes **más prácticas e importantes** del tema.

Antes de modificar un sistema, el administrador debería seguir varios principios:

1. **Planificar antes de realizar los cambios.**
2. Hacer que los cambios sean **reversibles**.
3. Realizar los cambios **incrementalmente**.
4. **Probar repetidamente** antes de llevar algo a producción.
5. Entender cómo funcionan realmente los sistemas.
6. Actuar con precaución **antes** de modificar.
7. Realizar pruebas **después** de modificar.
8. Mantener un **cuaderno de bitácora** de las operaciones realizadas. :chatgpt-content-reference{index="26"}

### Ejemplo

Supongamos que necesitas actualizar un servidor:

```text
❌ Mala administración

Actualizar directamente producción
        ↓
Algo falla
        ↓
No sabemos qué cambió
        ↓
Servicio caído
```

Frente a:

```text
✅ Buena administración

Planificar
    ↓
Crear backup / posibilidad de rollback
    ↓
Probar
    ↓
Cambio incremental
    ↓
Verificar funcionamiento
    ↓
Documentar
```

### Regla mental

> **Planifica → hazlo reversible → cambia poco a poco → prueba → documenta.**

---

# 16. El SysAdmin como primera línea de respuesta

Los administradores suelen constituir el **primer nivel de respuesta ante una crisis tecnológica**.

Incluso problemas aparentemente pequeños de los usuarios pueden terminar provocando:

- tiempo de inactividad;
- pérdida de productividad;
- problemas de seguridad.

Por eso, las incidencias no deben ignorarse simplemente porque parezcan poco importantes. :chatgpt-content-reference{index="27"}

Además, el administrador debe equilibrar dos aspectos:

```text
AUTORIDAD + RESPONSABILIDAD
            ↕
   SERVICIO + COOPERACIÓN
```

Es decir, tiene privilegios elevados sobre los sistemas, pero estos existen para prestar un servicio a la organización.

---

# 17. BYOD y seguridad

Otro reto moderno es el **BYOD — Bring Your Own Device**, es decir, permitir que los empleados utilicen sus propios dispositivos.

Esto aumenta considerablemente la variedad de dispositivos que debe gestionar el administrador.

Debe conseguir simultáneamente:

```text
Dar herramientas a los empleados
              +
Mantener la seguridad empresarial
```

Por tanto, existe un equilibrio entre **usabilidad/productividad y seguridad**.

El tema también destaca que el administrador debe mantenerse al día mediante reuniones y formación, y participar en determinadas decisiones estratégicas de la organización. :chatgpt-content-reference{index="28"}

---

# 18. El futuro del administrador de sistemas

El **Cloud Computing** y la automatización están transformando este trabajo.

La función del SysAdmin se dirige progresivamente hacia:

- desarrollo de sistemas;
- ingeniería;
- automatización;
- administración de infraestructuras de mayor escala.

Pero la automatización **no elimina la necesidad del control humano**. :chatgpt-content-reference{index="29"}

Esta evolución conecta directamente con un concepto fundamental:

# 19. DevOps

Tradicionalmente existían dos mundos bastante separados:

```text
DESARROLLO                  SISTEMAS
    │                          │
Escribe código             Producción
    │                          │
    └──────── separados ───────┘
```

Esto provocaba problemas.

Los desarrolladores podían crear una aplicación que funcionase perfectamente en su entorno, pero que posteriormente fallase en producción porque:

```text
Entorno desarrollo ≠ Entorno producción
```

Además, los administradores tenían que realizar ajustes para adaptar el código al entorno real.

**DevOps** busca acercar ambos mundos mediante la colaboración entre desarrollo y sistemas:

```text
Desarrollo  ←──── colaboración ────→  Operaciones
      \                               /
       \                             /
        └────────── DevOps ─────────┘
```

El material sitúa la aparición de estas metodologías en torno a **2008** y destaca que los desarrolladores deben comprender el trabajo de administración y viceversa; como consecuencia, los administradores necesitan también conocimientos de programación. :chatgpt-content-reference{index="30"}

---

# 20. Principios de DevOps

Según el tema, DevOps implica:

- **testeo automático del código**;
- workflows automatizados;
- **infraestructura automática**;
- desarrollo del software en partes más pequeñas;
- aproximar el entorno de desarrollo al entorno de producción;
- escribir código que determine cómo debe construirse la infraestructura;
- facilitar el despliegue sobre distintas infraestructuras;
- mantener una documentación cuidadosa. :chatgpt-content-reference{index="31"}

La idea central puede resumirse como:

```text
ANTES

Desarrollo ──► entrega código ──► Sistemas ──► Producción


DEVOPS

Desarrollo
    ↕
Colaboración + Automatización
    ↕
Operaciones
    │
    ▼
Producción
```

Implantar DevOps en una organización no consiste únicamente en instalar herramientas. El material lo resume mediante:

> **Cambio de mentalidad + nuevas herramientas + nuevas capacidades.** :chatgpt-content-reference{index="32"}

---

# 21. Mapa conceptual completo del tema

```text
                    SISTEMA DE INFORMACIÓN
                             │
            ┌────────────────┼────────────────┐
            │                │                │
         HUMANA         ORGANIZATIVA      TECNOLÓGICA
                             │
                             ▼
                    DATOS → INFORMACIÓN
                              ↓
                         CONOCIMIENTO
                              │
                              ▼
                    TOMA DE DECISIONES


                    INFRAESTRUCTURA
                           │
                           ▼
                          CPD
                           │
       ┌───────────────────┼────────────────────┐
       │                   │                    │
   Servidores        Almacenamiento           Redes
       │
       ▼
 Evolución histórica
       │
       ▼
Mainframe
   ↓
Minicomputadores
   ↓
Cliente-servidor
   ↓
Computación distribuida
   ↓
Grid Computing
   ↓
Clusters
   ↓
Virtualización
   ↓
Cloud Computing
   ↓
Consolidación


              ADMINISTRACIÓN
                    │
                    ▼
                 SYSADMIN
                    │
     ┌──────────────┼──────────────┐
     │              │              │
 Hardware        Software       Usuarios
     │              │              │
     └──────────────┼──────────────┘
                    │
               Seguridad
                    │
               Automatización
                    │
                    ▼
                  DevOps
```

---

# 22. Conceptos que deberías dominar para el examen

Si quieres comprobar que realmente has entendido el tema, deberías ser capaz de explicar **con tus propias palabras** estas relaciones:

| Concepto | Qué debes recordar |
|---|---|
| **Sistema de Información** | Captura, almacena y transforma datos para proporcionar información útil. |
| **Dato** | Hecho sin procesar. |
| **Información** | Datos procesados y dotados de relevancia. |
| **Conocimiento** | Información transformada mediante experiencia e interpretación. |
| **Dimensiones del SI** | Humana + tecnológica + organizativa. |
| **Calidad de información** | No importa tener mucha, sino disponer de la información adecuada. |
| **CPD** | Infraestructura física y tecnológica donde se procesan, almacenan y comunican datos. |
| **Redundancia** | Evitar que un único fallo interrumpa el servicio. |
| **Computación distribuida** | Ordenadores independientes conectados que trabajan hacia un objetivo común. |
| **Grid Computing** | Agregación de recursos de múltiples ordenadores para abordar un problema intensivo. |
| **Cluster** | Varios ordenadores conectados que se comportan como una unidad. |
| **Virtualización** | Varias máquinas virtuales comparten los recursos de un host físico. |
| **Cloud Computing** | Recursos informáticos consumidos a través de Internet de manera flexible. |
| **IaaS / PaaS / SaaS** | Infraestructura / plataforma / software como servicio. |
| **SysAdmin** | Administra, configura, mantiene y resuelve problemas de los sistemas. |
| **Buena administración** | Planificar, hacer reversible, cambiar incrementalmente, probar y documentar. |
| **BYOD** | Uso de dispositivos propios de los empleados y los retos de gestión y seguridad asociados. |
| **DevOps** | Acercamiento entre desarrollo y operaciones mediante colaboración, automatización y nuevas capacidades. |

## 🎯 La idea que conecta todo el tema

El hilo conductor puede resumirse así:

**Una organización necesita información para tomar decisiones → esa información procede de datos → los sistemas de información gestionan esos datos → la infraestructura tecnológica necesaria puede alojarse en CPD → esa infraestructura ha evolucionado desde mainframes hasta virtualización y cloud → alguien tiene que administrarla → ese papel corresponde al SysAdmin → y su evolución moderna lo acerca cada vez más a la automatización, la programación y DevOps.**

Si entiendes **esa cadena completa** en lugar de memorizar cada diapositiva aisladamente, tienes prácticamente construida la estructura conceptual de todo el Tema 1. :chatgpt-content-reference{index="33"}
