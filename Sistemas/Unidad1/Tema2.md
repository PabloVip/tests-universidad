# Tema 2 — Virtualización
### Administración de Sistemas

Este tema estudia la **virtualización desde sus fundamentos hasta Docker**, pasando por máquinas virtuales, hipervisores, virtualización asistida por hardware, ventajas e inconvenientes, hiperconvergencia, Cloud Computing y AWS. Es un tema bastante más extenso que el anterior, pero casi todo puede entenderse siguiendo una misma idea: **separar los recursos lógicos de los recursos físicos que realmente los proporcionan**. :chatgpt-content-reference{index="0"}

---

# 1. Idea fundamental: ¿qué significa virtualizar?

Históricamente, **virtualizar** significa tomar algo que se encuentra en un determinado estado y **hacer que parezca encontrarse en otro diferente**.

En informática aparecen dos aproximaciones:

```text
VIRTUALIZACIÓN
1 computador físico
        ↓
parece
        ↓
N computadores


AGREGACIÓN / GRID COMPUTING
N computadores físicos
        ↓
parecen
        ↓
1 computador
```

Son, en cierto sentido, ideas opuestas: la virtualización divide lógicamente los recursos de una máquina, mientras que técnicas como *Grid Computing* combinan recursos de múltiples máquinas. :chatgpt-content-reference{index="1"}

---

# 2. Antecedentes históricos

La virtualización **no es una tecnología reciente**. El material sitúa sus antecedentes varias décadas atrás, inicialmente en grandes centros de cálculo bancarios, militares y universitarios. :chatgpt-content-reference{index="2"}

Un ejemplo histórico importante es el **ordenador Atlas (1962)**.

El problema era que múltiples trabajadores utilizaban simultáneamente un único computador mediante terminales. Era necesario:

- repartir el procesador;
- repartir el almacenamiento;
- compartir recursos;
- evitar que el trabajo de un usuario interfiriese con el de otro.

De ahí surge la necesidad de **particionar recursos como disco, memoria y capacidad de cómputo**. :chatgpt-content-reference{index="3"}

La idea sigue siendo esencial hoy:

```text
              MÁQUINA FÍSICA
                    │
         ┌──────────┼──────────┐
         │          │          │
       CPU        RAM        Disco
         │          │          │
         └──────────┼──────────┘
                    ↓
              Virtualización
                    ↓
        ┌───────────┼───────────┐
        │           │           │
       VM1         VM2         VM3
```

---

# 3. ¿Qué es la virtualización?

La definición central del tema es:

> La **virtualización** es una tecnología software que permite **abstraer los recursos de un computador**, proporcionando acceso lógico a recursos físicos.

Por tanto, separa lógicamente:

```text
Lo que solicita el servicio
          │
          ▼
    RECURSO LÓGICO
          │
    Virtualización
          │
          ▼
    RECURSO FÍSICO
```

Es decir, quien utiliza el recurso **no necesita conocer necesariamente el hardware físico que realmente lo proporciona**. :chatgpt-content-reference{index="4"}

Esto permite, por ejemplo, ejecutar **varios sistemas operativos y aplicaciones simultáneamente sobre un mismo equipo físico**. :chatgpt-content-reference{index="5"}

---

# 4. ¿Qué recursos pueden virtualizarse?

Sobre una máquina física o **host** pueden crearse versiones virtuales de recursos como:

- CPU;
- memoria;
- almacenamiento;
- recursos de red. :chatgpt-content-reference{index="6"}

Por ejemplo:

```text
Servidor físico
├── 16 núcleos CPU
├── 64 GB RAM
└── 2 TB almacenamiento

             ↓ virtualización

VM 1                    VM 2
├── 4 vCPU              ├── 8 vCPU
├── 16 GB RAM           ├── 32 GB RAM
└── 200 GB disco        └── 500 GB disco
```

Las VM perciben esos recursos como propios aunque realmente procedan del mismo hardware físico.

---

# 5. Dos conceptos esenciales: VM e hipervisor

Aquí están probablemente los **dos conceptos más importantes de toda la primera mitad del tema**.

## Máquina Virtual — VM

Una **máquina virtual (Virtual Machine)** es un contenedor software aislado e independiente que contiene:

```text
Máquina Virtual
│
├── Hardware simulado
├── Sistema operativo
└── Aplicaciones
```

Cada VM se comporta, desde el punto de vista del sistema operativo, de forma similar a un ordenador independiente.

## Hipervisor — VMM

El **hipervisor**, también denominado **Virtual Machine Monitor (VMM)**, constituye la capa encargada de gestionar las máquinas virtuales.

Sus funciones incluyen:

- desvincular las VM del host físico;
- asignar dinámicamente recursos a las VM;
- gestionar el acceso al hardware.

Puede ejecutarse directamente sobre el hardware o sobre un sistema operativo anfitrión. :chatgpt-content-reference{index="7"}

Visualmente:

```text
┌───────────┐ ┌───────────┐ ┌───────────┐
│    VM1    │ │    VM2    │ │    VM3    │
│ Linux     │ │ Windows   │ │ Linux     │
│ Apps      │ │ Apps      │ │ Apps      │
└─────┬─────┘ └─────┬─────┘ └─────┬─────┘
      └──────────────┼──────────────┘
                     ▼
              ┌─────────────┐
              │ HIPERVISOR  │
              └──────┬──────┘
                     ▼
              ┌─────────────┐
              │  HARDWARE   │
              └─────────────┘
```

### 🧠 Regla para memorizar

**VM = ordenador virtual.**  
**Hipervisor = quien administra los ordenadores virtuales y reparte el hardware físico.**

---

# 6. Virtualización ≠ Cloud Computing

El material insiste especialmente en esto:

> **Virtualización y Cloud Computing no son lo mismo.** :chatgpt-content-reference{index="8"}

Ambos utilizan recursos abstraídos, pero representan conceptos diferentes.

| | Virtualización | Cloud Computing |
|---|---|---|
| **Qué es** | Tecnología | Metodología |
| **Objetivo** | Crear múltiples entornos sobre un sistema físico | Proporcionar recursos automatizados bajo demanda |
| **Gestión** | El administrador gestiona hipervisor y VM | Muchas operaciones se automatizan mediante APIs |
| **Recursos** | Conjunto particular de recursos | Conjunto variable solicitado según necesidad |

La **virtualización puede ser un componente que posibilite un entorno cloud**, pero una cosa no equivale automáticamente a la otra. :chatgpt-content-reference{index="9"}

---

# 7. Tipos de virtualización

El tema distingue varias formas dependiendo de **qué recurso estamos abstrayendo**.

## 7.1. Virtualización de plataforma

Se virtualiza **un sistema completo**.

Se abstrae todo el hardware subyacente para permitir que varias instancias de sistemas operativos puedan ejecutarse independientemente. :chatgpt-content-reference{index="10"}

Dentro de ella aparecen varias técnicas.

### Emulación nativa

Se **emula una arquitectura sobre otra**.

El hardware es replicado/emulado para permitir que las máquinas virtuales se ejecuten.

```text
Guest
  ↓
Hardware virtual
  ↓
Emulador
  ↓
Hardware real
```

Puede utilizarse incluso cuando la arquitectura que espera el software no coincide con la arquitectura física subyacente.

---

## 7.2. Paravirtualización

Aquí el hipervisor **no tiene necesariamente que emular todo el hardware**.

En su lugar proporciona determinadas APIs denominadas **hypercalls**, que puede utilizar un sistema operativo invitado modificado. :chatgpt-content-reference{index="11"}

Conceptualmente:

```text
SO Guest
   │
   │ hypercalls
   ▼
Hipervisor
   │
   ▼
Hardware
```

La palabra importante aquí es **colaboración**: el sistema operativo invitado sabe que está virtualizado y coopera con el hipervisor.

---

# 8. Virtualización completa

La **virtualización completa** evita esa necesidad de modificar el sistema operativo invitado.

El SO *guest* puede funcionar sin tener que colaborar explícitamente con el hipervisor. :chatgpt-content-reference{index="12"}

### Diferencia clave

```text
PARAVIRTUALIZACIÓN

Guest modificado
      ↓
sabe que está virtualizado
      ↓
hypercalls
      ↓
Hipervisor


VIRTUALIZACIÓN COMPLETA

Guest sin modificar
      ↓
Hipervisor
      ↓
Hardware
```

🧠 **Para = el guest participa.**  
🧠 **Completa = el guest no necesita modificarse.**

---

# 9. Virtualización de Sistema Operativo

En este caso, diferentes entornos comparten **el mismo kernel del sistema operativo host**, creando instancias independientes entre sí. :chatgpt-content-reference{index="13"}

La arquitectura cambia considerablemente:

```text
┌──────────┐  ┌──────────┐
│ Apps     │  │ Apps     │
│ Entorno A│  │ Entorno B│
└────┬─────┘  └────┬─────┘
     └──────┬───────┘
            ▼
     MISMO KERNEL
            │
            ▼
         HARDWARE
```

Esta idea será **muy importante cuando lleguemos a los contenedores y Docker**.

---

# 10. Virtualización de recursos

No siempre tenemos que virtualizar un ordenador completo. Podemos abstraer **un recurso individual**.

El tema incluye:

- memoria virtual;
- virtualización de red;
- virtualización de entrada/salida;
- virtualización de memoria.

Como ejemplos aparecen el **swap de Linux** para memoria virtual y las **VPN** para virtualización de red. También puede combinarse RAM procedente de sistemas conectados en red para formar una memoria virtual común. :chatgpt-content-reference{index="14"}

La diferencia conceptual es:

```text
Virtualización de plataforma
        ↓
virtualizamos el COMPUTADOR


Virtualización de recursos
        ↓
virtualizamos UN RECURSO
```

---

# 11. Virtualización de aplicaciones

En este caso se encapsula una **aplicación**.

La aplicación cree que está interactuando normalmente con el sistema operativo, aunque realmente existe una capa intermedia.

Su objetivo principal es facilitar:

- portabilidad;
- compatibilidad.

El material proporciona tres ejemplos:

- **Wine**;
- **JVM — Java Virtual Machine**;
- **CLR — Common Language Runtime de .NET**. :chatgpt-content-reference{index="15"}

Conceptualmente:

```text
Aplicación
     ↓
Entorno virtual / Runtime
     ↓
Sistema Operativo
     ↓
Hardware
```

---

# 12. Virtualización de escritorio

Consiste en separar el **escritorio del usuario** de la máquina física desde la que accede.

El escritorio puede encontrarse almacenado en un servidor remoto y ser utilizado desde:

- ordenador;
- portátil;
- móvil;
- otros dispositivos.

El usuario no necesita conocer dónde está físicamente almacenado.

El ejemplo proporcionado en el tema es **Citrix**. :chatgpt-content-reference{index="16"}

```text
PC ─────────┐
            │
Portátil ───┼── Internet/Red ──► Escritorio remoto
            │                     en servidor
Móvil ──────┘
```

---

# 13. ¿Cómo funciona la virtualización?

El tema distingue entre:

```text
Virtualización por software
             VS
Virtualización asistida por hardware
```

La segunda aprovecha extensiones específicas del procesador como:

- **Intel VT**
- **AMD-V**

El diagrama de la página 22 representa precisamente esta diferencia. :chatgpt-content-reference{index="17"}

---

# 14. Virtualización asistida por hardware

La CPU incorpora instrucciones específicas destinadas a facilitar la virtualización.

El material introduce aquí el concepto de **ring -1**.

Simplificando:

```text
Aplicaciones
     ↓
Ring 3

Sistema Operativo
     ↓
Ring 0

Hipervisor
     ↓
Ring -1

Hardware
```

El hipervisor puede ejecutarse en un nivel más privilegiado que el SO invitado.

Cuando el guest intenta realizar determinadas operaciones sobre hardware:

```text
SO Guest
   │
   │ operación privilegiada
   ▼
CPU
   │
   ▼
Hipervisor / VMM
   │
   │ gestiona operación
   ▼
CPU
   │
   ▼
SO Guest continúa
```

La CPU captura determinadas llamadas, conserva el estado necesario y permite que el VMM gestione el evento. El SO invitado puede comportarse como si estuviera ejecutándose en **ring 0**. :chatgpt-content-reference{index="18"}

---

# 15. Tipos de hipervisores

Esta distinción es **fundamental para el examen**.

## Hipervisor Tipo 1 — Bare Metal

Se ejecuta **directamente sobre el hardware**.

```text
┌────────┐ ┌────────┐
│ Guest 1│ │ Guest 2│
└───┬────┘ └───┬────┘
    └─────┬─────┘
          ▼
     HIPERVISOR
          │
          ▼
       HARDWARE
```

Ejemplo del tema:

**VMware ESXi**

Al acceder directamente al hardware proporciona **mayor rendimiento**. :chatgpt-content-reference{index="19"}

---

## Hipervisor Tipo 2

Se ejecuta **sobre un sistema operativo host**.

```text
┌────────┐ ┌────────┐
│ Guest 1│ │ Guest 2│
└───┬────┘ └───┬────┘
    └─────┬─────┘
          ▼
     HIPERVISOR
          │
          ▼
       HOST OS
          │
          ▼
       HARDWARE
```

Ejemplos del tema:

- VMware Workstation
- VirtualBox
- Parallels
- VirtualPC

Ofrecen mayor compatibilidad con hardware y determinadas funcionalidades, pero el material señala **menor rendimiento y estabilidad** debido a que la carga también pasa por el SO anfitrión. :chatgpt-content-reference{index="20"}

### 🧠 Truco para distinguirlos

```text
TIPO 1 → Hardware primero
TIPO 2 → Sistema Operativo primero
```

O simplemente:

> **Tipo 1 = hipervisor sobre hardware.**  
> **Tipo 2 = hipervisor sobre SO.**

---

# 16. Elementos de una máquina virtual VMware

Una VM no es necesariamente un único fichero. VMware utiliza distintos archivos para representar sus componentes.

## `.vmx`

Fichero raíz de **configuración de la VM**.

Es texto plano y almacena la configuración de la máquina virtual.

## `.nvram`

Almacena el estado de la **BIOS** de la máquina virtual.

## `.log`

Contiene el **registro principal de eventos**. :chatgpt-content-reference{index="21"}

---

# 17. Disco virtual — `.vmdk`

El fichero `.vmdk` representa el **disco virtual**.

Un disco puede estar formado por uno o varios ficheros `.vmdk`. :chatgpt-content-reference{index="22"}

Conceptualmente:

```text
Máquina física
└── SSD físico
     └── archivos .vmdk
          └── VM
               └── "Disco duro virtual"
```

Para la VM parece un disco:

```text
C:\
/
```

pero físicamente puede ser simplemente un conjunto de archivos almacenados en el host.

El tema también explica la división del contenido del disco en archivos `s###.vmdk`, así como variantes cuando se reserva previamente todo el espacio mediante ficheros `f###.vmdk`. :chatgpt-content-reference{index="23"}

---

# 18. Snapshots

VMware también utiliza:

### `.vmsd`

Centraliza información y metadatos relacionados con los **snapshots**.

### `.vmsn`

Almacena el **estado de la VM en el momento en que se realiza un snapshot**. :chatgpt-content-reference{index="24"}

Un snapshot puede entenderse conceptualmente como:

```text
Estado inicial
     │
     ├── Snapshot A
     │      │
     │      └── cambios...
     │
     └────────► posibilidad de recuperar
                determinado estado
```

---

# 19. ¿Por qué apareció la necesidad de virtualizar?

La virtualización responde a varios problemas reales de los CPD.

## 19.1. Servidores infrautilizados

Supongamos:

```text
Servidor A → 10 % CPU
Servidor B → 15 % CPU
Servidor C → 8 % CPU
Servidor D → 20 % CPU
```

Tenemos cuatro servidores físicos consumiendo:

- electricidad;
- espacio;
- refrigeración;
- mantenimiento;

aunque apenas utilizan sus recursos.

Con virtualización:

```text
ANTES                     DESPUÉS

Servidor A 10 % ┐
Servidor B 15 % ├──►     Servidor físico
Servidor C  8 % │         ├── VM A
Servidor D 20 % ┘         ├── VM B
                           ├── VM C
                           └── VM D
```

Esto conduce a la **consolidación de servidores**.

---

# 20. Otras razones para virtualizar

El material identifica además:

- agotamiento del espacio en los CPD;
- necesidad de abstraer almacenamiento;
- necesidad de mejorar la eficiencia energética;
- reducción de costes de administración;
- monitorización centralizada;
- aprovisionamiento automático de máquinas;
- simplificación de copias de seguridad;
- restauración más sencilla;
- redundancia y replicación;
- alta disponibilidad;
- alto rendimiento.

Al utilizar menos servidores físicos también disminuye el consumo energético. :chatgpt-content-reference{index="25"}

Además, los servicios modernos pueden necesitar una disponibilidad cercana a **24×365**, manteniendo simultáneamente fiabilidad y rendimiento elevados. :chatgpt-content-reference{index="26"}

---

# 21. Ventajas de la virtualización

## Consolidación

Permite reducir el número de servidores físicos mientras aumenta su porcentaje de utilización.

## Administración simplificada

Las máquinas pueden:

- clonarse;
- desplegarse;
- copiarse;
- restaurarse;

con mayor facilidad.

## Alta disponibilidad

Si falla un sistema físico, determinadas máquinas virtuales pueden migrarse o distribuirse hacia otros sistemas.

## Redundancia

Es más sencillo mantener servidores virtuales redundantes distribuidos entre distintos servidores físicos.

## Reducción de costes

Se reduce la cantidad de hardware y parte de los costes asociados.

## Backups y recuperación

Simplifica las políticas de:

- puesta en marcha;
- copia de seguridad;
- recuperación.

## Eficiencia energética

Menos servidores físicos implican menor consumo eléctrico. :chatgpt-content-reference{index="27"} :chatgpt-content-reference{index="28"}

---

# 22. La idea de alta disponibilidad

Es importante entenderla bien.

Sin virtualización:

```text
Servidor físico falla
        ↓
Servicio que ejecutaba
        ↓
CAÍDO
```

Con una infraestructura virtualizada preparada para ello:

```text
Host A
└── VM servicio
       │
       │ Host A falla
       ▼
Host B
└── VM servicio
```

La independencia entre **máquina lógica y máquina física** facilita estas estrategias.

---

# 23. Inconvenientes de la virtualización

La virtualización tampoco es gratuita desde el punto de vista técnico.

Uno de sus principales inconvenientes es la **pérdida de rendimiento**: existe una capa adicional entre determinadas operaciones del sistema invitado y el hardware físico.

Conceptualmente:

```text
Sistema tradicional

Aplicación
    ↓
SO
    ↓
Hardware


Virtualizado

Aplicación
    ↓
SO Guest
    ↓
Hipervisor
    ↓
Hardware
```

Además, al consolidar varias VM sobre una misma infraestructura física aumenta la importancia de dimensionar y administrar correctamente el host: los recursos físicos siguen siendo **finitos**, aunque estén abstraídos.

---

# 24. Hiperconvergencia

La evolución de los CPD busca simplificar aún más la infraestructura.

La **hiperconvergencia** integra recursos que tradicionalmente podían administrarse de manera independiente, especialmente:

```text
CÓMPUTO
   +
ALMACENAMIENTO
   +
RED
   +
VIRTUALIZACIÓN
   ↓
INFRAESTRUCTURA HIPERCONVERGENTE
```

La idea conceptual importante es **consolidar y gestionar conjuntamente la infraestructura**, reduciendo la complejidad asociada a disponer de sistemas separados.

---

# 25. Virtualización y Cloud

Una vez podemos abstraer CPU, memoria, almacenamiento y red, resulta posible construir infraestructuras donde esos recursos puedan proporcionarse de forma flexible.

Aquí aparece la relación:

```text
HARDWARE
    ↓
VIRTUALIZACIÓN
    ↓
RECURSOS VIRTUALES
    ↓
AUTOMATIZACIÓN
    ↓
CLOUD COMPUTING
```

La virtualización proporciona la abstracción; el **Cloud Computing añade automatización y consumo bajo demanda**, según la distinción que establece el propio tema. :chatgpt-content-reference{index="29"}

---

# 26. Amazon Web Services

El tema utiliza **Amazon Web Services (AWS)** como ejemplo práctico del modelo cloud.

La idea que debes conectar con todo lo anterior es:

```text
Usuario
   │
   │ solicita recursos
   ▼
Cloud
   │
   ├── Computación
   ├── Almacenamiento
   ├── Red
   └── otros servicios
```

El usuario no tiene que adquirir necesariamente el servidor físico que hay detrás. Consume **recursos lógicos proporcionados mediante la infraestructura cloud**.

Esta es precisamente la evolución natural del concepto de abstracción estudiado desde el principio del tema.

---

# 27. Máquinas virtuales vs contenedores

Aquí comienza la segunda gran parte del tema.

Una **máquina virtual** virtualiza un sistema completo.

```text
┌──────────────┐
│ Aplicación A │
├──────────────┤
│ Guest OS     │
├──────────────┤
│ HW virtual   │
└──────────────┘
```

Un **contenedor**, en cambio, no necesita incorporar un sistema operativo completo independiente de la misma forma.

Los contenedores comparten componentes del sistema anfitrión, especialmente su **kernel**.

```text
MÁQUINAS VIRTUALES

App A       App B
  │           │
Guest OS A  Guest OS B
  └─────┬─────┘
     Hipervisor
         │
      Host HW


CONTENEDORES

App A       App B
  │           │
Contenedor A Contenedor B
  └─────┬─────┘
   Kernel compartido
         │
      Host HW
```

---

# 28. Diferencia fundamental VM vs contenedor

Esta es otra comparación que merece la pena memorizar:

| Máquina virtual | Contenedor |
|---|---|
| Virtualiza una máquina | Virtualiza/aisla el entorno de ejecución |
| Incluye SO guest | Comparte el kernel |
| Más pesada | Más ligero |
| Consume más recursos | Consume menos recursos |
| Arranque normalmente más lento | Arranque normalmente más rápido |
| Mayor separación a nivel de SO | Procesos aislados compartiendo kernel |

### 🧠 Frase para recordar

> **VM → virtualiza hardware.**  
> **Contenedor → aisla aplicaciones compartiendo el kernel.**

---

# 29. ¿Qué es Docker?

**Docker** permite crear y ejecutar aplicaciones mediante **contenedores**.

Su objetivo fundamental es encapsular una aplicación junto con aquello que necesita para ejecutarse, proporcionando un entorno reproducible.

La idea puede representarse así:

```text
Aplicación
   +
Dependencias
   +
Configuración
   ↓
 IMAGEN
   ↓
Contenedor
```

Esto ayuda a solucionar el clásico problema:

> «En mi ordenador funciona».

Porque se intenta reproducir el mismo entorno independientemente de dónde se ejecute el contenedor.

---

# 30. Arquitectura conceptual de Docker

Los elementos fundamentales pueden entenderse como:

```text
USUARIO
   │
   ▼
Docker Client
   │
   ▼
Docker Engine / Daemon
   │
   ├──── Imágenes
   │
   └──── Contenedores
             │
             ▼
         Aplicaciones
```

Además, las imágenes pueden almacenarse en un **registro (registry)**.

```text
Registry
   │
   │ pull
   ▼
Imagen
   │
   │ run
   ▼
Contenedor
```

---

# 31. Imagen Docker

Una **imagen** contiene lo necesario para crear un contenedor.

Conceptualmente podemos verla como una **plantilla**.

```text
        IMAGEN
          │
     docker run
          │
    ┌─────┼─────┐
    ▼     ▼     ▼
 Cont.1 Cont.2 Cont.3
```

Una misma imagen puede utilizarse para crear múltiples contenedores.

### Ejemplo

```text
Imagen: nginx

       ↓
┌─────────────┐
│ nginx #1    │
└─────────────┘

       ↓
┌─────────────┐
│ nginx #2    │
└─────────────┘
```

---

# 32. Imagen ≠ contenedor

Esta distinción es absolutamente esencial.

> **Imagen = plantilla.**  
> **Contenedor = instancia en ejecución creada a partir de la plantilla.**

Una analogía sencilla:

```text
Clase           → Objeto
Imagen Docker   → Contenedor
```

No es exactamente la misma relación técnicamente, pero resulta útil para memorizarla.

Otra analogía:

```text
RECETA
  ↓
Imagen

PLATO COCINADO
  ↓
Contenedor
```

---

# 33. Contenedor Docker

El **contenedor** es el entorno aislado en el que se ejecuta la aplicación.

Puede tener:

- procesos;
- sistema de archivos;
- configuración;
- red;
- recursos asignados;

pero utiliza mecanismos del sistema anfitrión en lugar de necesitar una máquina virtual completa.

Por eso los contenedores suelen ser mucho más ligeros.

```text
Servidor
│
├── Contenedor API
│     └── aplicación
│
├── Contenedor Web
│     └── nginx
│
└── Contenedor BBDD
      └── base de datos
```

---

# 34. Ciclo básico de Docker

Una forma muy útil de entender Docker es:

```text
Dockerfile
    │
    │ build
    ▼
 Imagen
    │
    │ run
    ▼
Contenedor
```

Es decir:

### 1. Dockerfile

Describe cómo construir la imagen.

### 2. `docker build`

Construye la imagen.

### 3. Imagen

Plantilla inmutable desde la que crear contenedores.

### 4. `docker run`

Crea y ejecuta un contenedor.

### 5. Contenedor

Instancia ejecutable de esa imagen.

---

# 35. Dockerfile

Un **Dockerfile** es un fichero que contiene las instrucciones necesarias para construir una imagen Docker.

Conceptualmente:

```dockerfile
FROM ...
WORKDIR ...
COPY ...
RUN ...
EXPOSE ...
CMD ...
```

No necesitas memorizar este ejemplo literalmente para comprender el tema; lo importante es la secuencia:

```text
Dockerfile
    ↓
describe cómo construir
    ↓
Imagen
    ↓
crea
    ↓
Contenedor
```

Esta relación es probablemente **la idea más importante de toda la parte de Docker**.

---

# 36. Capas de una imagen

Las imágenes Docker se construyen mediante **capas**.

Conceptualmente:

```text
┌─────────────────────────┐
│ Aplicación              │
├─────────────────────────┤
│ Dependencias            │
├─────────────────────────┤
│ Runtime                 │
├─────────────────────────┤
│ Imagen base             │
└─────────────────────────┘
```

Esto permite reutilizar elementos comunes entre diferentes imágenes y facilita su distribución.

---

# 37. Persistencia: el problema

Los contenedores están pensados para poder:

```text
Crear → ejecutar → detener → eliminar → recrear
```

Por eso debemos distinguir claramente entre:

```text
VIDA DEL CONTENEDOR
        ≠
VIDA DE LOS DATOS
```

Imagina una base de datos:

```text
Contenedor PostgreSQL
      │
      └── datos
```

Si los datos importantes dependen exclusivamente del sistema de archivos interno del contenedor, eliminarlo puede resultar problemático.

Queremos:

```text
Contenedor A
     │
     ▼
   DATOS
     ▲
     │
Contenedor B
```

Es decir, **desacoplar los datos persistentes del ciclo de vida del contenedor**.

---

# 38. Persistencia de datos en Docker

La solución consiste en utilizar mecanismos de almacenamiento persistente, especialmente **volúmenes**.

```text
┌──────────────────┐
│    Contenedor    │
│                  │
│ /datos ──────────┼────┐
└──────────────────┘    │
                        ▼
                    ┌────────┐
                    │ Volumen│
                    └────────┘
```

Ahora:

```text
Eliminar contenedor
       │
       X
       │
       ▼
Los datos pueden mantenerse
```

Y podemos crear otro contenedor:

```text
Nuevo contenedor
      │
      ▼
Mismo volumen
      │
      ▼
Mismos datos
```

### 🧠 Idea esencial

> **El contenedor puede ser efímero; los datos importantes no deberían depender de que ese contenedor concreto siga existiendo.**

---

# 39. Ventajas de Docker

Docker aprovecha muchas de las ideas estudiadas durante el tema:

### Ligereza

No necesitamos ejecutar un sistema operativo completo para cada aplicación.

### Rapidez

Los contenedores pueden crearse y arrancar rápidamente.

### Portabilidad

Podemos transportar la imagen y reproducir el entorno.

### Aislamiento

Las aplicaciones pueden ejecutarse en entornos separados.

### Reproducibilidad

El entorno puede definirse mediante código.

### Automatización

Facilita procesos automatizados de construcción y despliegue.

### Eficiencia

Múltiples contenedores pueden aprovechar eficientemente un mismo host.

---

# 40. La evolución completa que plantea el tema

Ahora podemos conectar prácticamente las **101 diapositivas** mediante una única evolución conceptual:

```text
HARDWARE FÍSICO
       │
       ▼
Necesidad de compartir recursos
       │
       ▼
VIRTUALIZACIÓN
       │
       ├── CPU
       ├── RAM
       ├── Disco
       └── Red
       │
       ▼
HIPERVISOR
       │
       ▼
MÁQUINAS VIRTUALES
       │
       ▼
Consolidación de servidores
       │
       ▼
Mayor eficiencia
       │
       ▼
Infraestructura virtualizada
       │
       ▼
CLOUD COMPUTING
       │
       ▼
AWS
       │
       ▼
Virtualización / aislamiento
a nivel de sistema operativo
       │
       ▼
CONTENEDORES
       │
       ▼
DOCKER
       │
       ├── Dockerfile
       ├── Imagen
       ├── Contenedor
       └── Persistencia
```

---

# 41. Mapa conceptual del tema

```text
                         VIRTUALIZACIÓN
                              │
                ┌─────────────┼─────────────┐
                │             │             │
           Abstracción      Aislamiento   Consolidación
                │
                ▼
             RECURSOS
                │
       ┌────────┼─────────┐
       │        │         │
      CPU      RAM       Disco/Red
       │
       ▼
            HIPERVISOR
                │
       ┌────────┴─────────┐
       │                  │
    TIPO 1             TIPO 2
  Bare Metal           Host OS
       │                  │
       └────────┬─────────┘
                ▼
               VM
                │
        ┌───────┼───────┐
        │       │       │
      vCPU     RAM     Disco
        │
        ▼
       Guest OS
        │
        ▼
    Aplicaciones


             EVOLUCIÓN
                │
                ▼
       CLOUD COMPUTING
                │
                ▼
               AWS


        OTRA APROXIMACIÓN
                │
                ▼
          CONTENEDORES
                │
                ▼
             DOCKER
                │
       ┌────────┼──────────┐
       │        │          │
 Dockerfile   Imagen   Contenedor
       │        │          │
       │        │          └── ejecución
       │        │
       │        └── plantilla
       │
       └── construcción
                │
                ▼
          PERSISTENCIA
                │
                ▼
             Volúmenes
```

---

# 42. Comparaciones que deberías dominar

Estas son especialmente útiles para estudiar.

| Conceptos | Diferencia esencial |
|---|---|
| **Virtualización vs Grid Computing** | Uno divide lógicamente una máquina; el otro combina recursos de múltiples máquinas |
| **Host vs Guest** | Host = anfitrión físico/lógico; Guest = sistema invitado |
| **VM vs hipervisor** | VM = máquina virtual; hipervisor = capa que las administra |
| **Paravirtualización vs completa** | En la primera el guest colabora; en la completa no necesita modificarse |
| **Hipervisor Tipo 1 vs Tipo 2** | Hardware directo vs ejecutarse sobre un SO host |
| **Virtualización vs Cloud** | Tecnología de abstracción vs provisión automatizada/bajo demanda |
| **VM vs contenedor** | SO completo virtualizado vs entorno aislado compartiendo kernel |
| **Imagen vs contenedor** | Plantilla vs instancia |
| **Dockerfile vs imagen** | Instrucciones de construcción vs resultado construido |
| **Contenedor vs volumen** | Ejecución potencialmente efímera vs almacenamiento persistente |

---

# 43. Conceptos que deberías poder definir en un examen

| Concepto | Qué debes recordar |
|---|---|
| **Virtualización** | Abstracción lógica de recursos físicos |
| **Host** | Sistema físico anfitrión |
| **Guest** | Sistema operativo invitado |
| **VM** | Máquina software aislada con HW virtual, SO y aplicaciones |
| **VMM / Hipervisor** | Gestiona VM y asigna recursos físicos |
| **Emulación** | Reproduce una arquitectura |
| **Paravirtualización** | Guest modificado que coopera mediante hypercalls |
| **Virtualización completa** | No requiere modificar el guest |
| **Virtualización de SO** | Entornos independientes que comparten kernel |
| **Tipo 1** | Hipervisor directamente sobre hardware |
| **Tipo 2** | Hipervisor sobre un SO anfitrión |
| **Intel VT / AMD-V** | Soporte hardware para virtualización |
| **`.vmx`** | Configuración de VM VMware |
| **`.vmdk`** | Disco virtual VMware |
| **`.nvram`** | Estado de BIOS |
| **`.log`** | Registro |
| **`.vmsd`** | Información/metadatos de snapshots |
| **`.vmsn`** | Estado de la VM en un snapshot |
| **Consolidación** | Ejecutar más sistemas sobre menos servidores físicos |
| **Alta disponibilidad** | Mantener servicios disponibles frente a fallos |
| **Cloud Computing** | Recursos automatizados disponibles bajo demanda |
| **Contenedor** | Entorno aislado que comparte kernel |
| **Docker** | Plataforma para trabajar con contenedores |
| **Imagen Docker** | Plantilla utilizada para crear contenedores |
| **Dockerfile** | Instrucciones para construir una imagen |
| **Volumen** | Mecanismo para desacoplar datos persistentes del contenedor |

---

# 44. Lo más importante para entender el tema de verdad

Si tuviera que reducir todo el Tema 2 a **cinco ideas**, serían estas:

**1. Virtualizar significa abstraer.**

```text
Recurso lógico
      ↓
no tiene por qué corresponder directamente
      ↓
Recurso físico
```

**2. El hipervisor permite compartir una máquina física entre múltiples VM.**

```text
VM + VM + VM
      ↓
 Hipervisor
      ↓
  Hardware
```

**3. Tipo 1 y Tipo 2 se distinguen por dónde se encuentra el hipervisor.**

```text
Tipo 1: VM → Hipervisor → Hardware

Tipo 2: VM → Hipervisor → Host OS → Hardware
```

**4. Una VM y un contenedor no son lo mismo.**

```text
VM → tiene su propio Guest OS

Contenedor → comparte kernel
```

**5. En Docker debes tener clarísima esta cadena:**

```text
Dockerfile
    │
    │ docker build
    ▼
  Imagen
    │
    │ docker run
    ▼
Contenedor
    │
    ▼
 Volumen
(si necesitamos persistencia)
```

---

## 🎯 Hilo conductor para estudiar el Tema 2

En lugar de intentar memorizar las 101 diapositivas independientemente, estudia esta historia:

> **Los servidores físicos desaprovechaban recursos → necesitamos abstraer y repartir CPU, RAM, disco y red → aparece la virtualización → el hipervisor gestiona esos recursos → podemos ejecutar múltiples VM sobre un host → esto permite consolidar servidores, ahorrar energía y facilitar alta disponibilidad → la automatización de recursos virtualizados contribuye al Cloud Computing → otra forma de aislamiento consiste en compartir el kernel mediante contenedores → Docker facilita construir y ejecutar esos contenedores → las imágenes actúan como plantillas, los contenedores como instancias y los mecanismos de persistencia permiten que los datos sobrevivan al ciclo de vida del contenedor.**

Si tienes interiorizada **esa secuencia**, el resto del tema deja de ser una colección de definiciones y pasa a tener bastante sentido como una única evolución tecnológica.
