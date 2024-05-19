# 
# BOILERPLATE CMS + SITIO WEB CLOUDFLARE
#
# NEXTJS , SONICJS, GRAPESJS, CLOUDFLARE D1 KV CACHE PAGES WORKERS.
#


# 1 - Especificaciones tecnicas 
 
    # 1.1 - MODULO CMS

    # 1.2 - MODULO PAGE BUILDER


# 2 - Comparaciones con otras opciones

    # 2.1 - ¿Qué diferencias tiene en cuanto a WORDPRESS?

    # 2.2 -¿Qué diferencias tiene en cuanto a TIENDANUBE?

    # 2.3 - ¿Qué diferencias tiene en cuanto a WIX, CANVAS, u otros PAGEBUILDERS?


# 3 Más sobre nextjs


# 4 Más sobre cloudflare


# 5 Datos reales y mediciones

    # 5.1 Proyeccion de escalabilidad y precios

# 6 FAQ

    # que es un CMS?

    # que es un CDN?

    # que son paginas DINAMICAS/ESTATICAS?

    # que son las BASES DE DATOS?

    # que es el CACHE?

    # que es CLOUDFLARE?

    # que es NEXTJS?

    # que es SSG/SSR?


#
#           _____________________________          
#           1 - ESPECIFICACIONES TECNICAS          
#                                                
#


#            _________________
#            1.1 -  MODULO CMS
#            CMS con ADMIN PANEL y VISUAL PAGE BUILDER/EDITOR 
#            Sistema completo montado sobre Cloudflare (KV, CACHE, D1, PAGES, WORKERS)  




# Al estar armado con Cloudflare Workers, funciona 6 veces mas rapido comparado con una configuracion NodeJS+Postgres y x veces mas rapido que PHP+mysql

# Al estar el backend (CMS, base de datos, cache, etc.) y el frontend (pagina propiamente dicha) integramente dentro de los servidores de Cloudflare, se generan muchisimos beneficios. 

# Editor visual incluido para crear/editar contenido de paginas de manera simple rapida e intuitiva (similar plantillas Elementor, page builder de Canvas etc.) con mas de 400 componentes/plantillas HTML/CSS incluidas. 

# Creacion, muestra/lectura, modificacion y borrado (CRUD) de cualquier informacion guardada en la base de datos.

# Todos los datos son servidos de la manera mas conveniente, utilizando los servicios nativos de CACHE y/o KV de Cloudflare.

# Sistema de autenticacion, administracion, roles y control de acceso de usuarios.

# Sistema de Migraciones de y hacia cualquier otro servicio (D1, la base de datos de cloudflare es una simple BD SQL)

# Sistema de BACKUPS





#             ____________
#             SINTETIZANDO
#


# Las capacidades de este modulo son comparables con las que ofrece Wordpress, Drupal o cualquier CMS: 

# Secciones dinamicas como articulos de  Blog, Ecommerce, sistemas de Elearning, pedidos de turnos ETC. 

# Secciones estaticas, como Landing Pages, Contactanos, ETC.

# Autenticacion de usuarios,

# Advanced Custom Fields, 

# Cache, Backups

# Endpoints RESTFUL API ETC.

# Login de usuarios con Email, Gmail, FB, Github, ETC.

# Migraciones

# Se le puede agregar o adaptar a cualquier proyecto, es un sistema integral de administracion de contenidos (CMS)


#            __________________________
#            1.2 - MODULO SITE GENERATOR.
#            Renderizado/Exportacion de las las distintas paginas que componen el sitio.
#            Se hace uso de NEXT.JS y Cloudflare PAGES 



# Se utiliza NEXT.JS para generar, segun sea necesario y desde la informacion que tenemos y manejamos en el CMS, paginas estaticas o paginas dinamicas segun sea necesario y de la manera mas conveniente.

# Principalmente, se construiran las paginas estaticas en el build time (las paginas cuyo contenido principal no es actualizado muy a menudo) o paginas dinamicas pre renderizadas en el servidor para cada solicitud (se utiliza mayormente para paginas cuyo contenido principal debe estar actualizado siempre que se lo solicite). 

# Este framework tambien ofrece muchisimas otras herramientas, como optimización SEO y de imágenes, links dinamicos, Cache en el browser, prerenderizado, modularizacion de contenido.

# Se implementan tambien funcionalidades de la biblioteca SWR para poder hacer, cuando sea posible, en paginas estaticas, fetchs o consultas a las Cookies/Session Storage, y, a partir de estos resultados, actualizaciones en la UI sin la necesidad de que la pagina sea dinamica ni ejecutar funciones en el servidor.

# NextJS es un el framework mas usado de react, un verdadero estandar de la industria



#            ___________________________________          
#            2 COMPARACIONES CON OTRAS PROUESTAS
#

# ¿Qué diferencias tiene en cuanto a WORDPRESS?

Muchos sitios WP usan como CDN a cloudflare por cuestiones de consumo y rendimiento, en el aproach actual no solo lo utilizamos de manera similar a un "CDN" (porque tiene alojada nuetras paginas) sino tambien como alojamiento integro de todo nuestro proyecto (backend, fuentes de datos y frontend), evitando llamadas entre distintos servidores.
 De principio, se  evita instalar, mantener, asegurar, etc un servidor de Wordpress pero se tienen las mismas funciones y mucho mas rapidas, todo dentro de cloudflare.


# ¿Qué diferencias tiene en cuanto a TIENDANUBE?

NO comisiones,
 + personalizacion,
  data ownership,
   + funcionalidades
    

# ¿Qué diferencias tiene en cuanto a WIX/CANVAS/PAGEBUILDERS?

personalizacion,
 data ownership,
  + funcionalidades,
   + optimizacion

# ¿Qué diferencias tiene en cuanto a montar un servidor NODEjs/React?

+optimizacion
se evita montar el servidor






#            __________________
#            3 SOBRE CLOUDFLARE
#         
 

# Otras opciones que brinda cloudflare

# copiar texto de algun lado donde explique lo generoso de tener todo on the edge. en general esta seccion es un copypaste mejorado de textos de cf.

# Cloudflare tiene una opcion para guardar su propia configuracion (a nivel plataforma) y asociarla a nuestro proyecto, de modo que, si la plataforma cambiara su funcionamiento, nuestra aplicacion alojada puede seguir siendo ejecutada dentro de la version y en la manera en que funcionaba. Esto nos resguarda de que el sitio pudiera llegar a tener inconvenientes si Cloudflare decidiera cambiar algun detalle de su funcionamiento.

# En cuanto a los precios y el uso de caracteristicas gratuitas de Cloudflare, podemos decir que esta empresa ofrece hace años el servicio de alojamiento de recursos estaticos de manera totalmente gratuita, sin mediciones ni limites. 

# Otra cosa son las funciones/Workers, el almacenamiento KV/D1, Cache, R2, etc. En estos servicios, hablando en terminos generales Cloudflare ofrece -en todos- una terna gratuita muy generosa, o mejor dicho, que no esta enfocada en que se "pruebe" el producto, sino en que se pueda realmente hacer un uso viable en proyectos reales, justamente en sus terminos de servicio aclara que se puede usar para proyectos comerciales.

# Una vez que se esta cerca de pasar los limites, cloudflare nos avisa, de modo que uno pueda estar preparado. Si se pasaran los limites se puede configurar una pagina que indique que esa funcionalidad tardara unas horas en reponerse etc. No es que por pasar un limite la pagina deje de funcionar.

# A la hora de aumentar esos limites, se puede pagar por cualquiera de ellos por separado, de modo que un proyecto puede usar la terna gratuita de todos los servicios y abonar una tarifa por alguan de las funcionalidades si es que hace un uso muy extensivo. Aunque algunos tengan tarifas de entrada normalmente se abona por uso.

# Lo cierto es que dados sus limites y terminos de uso, se puede hacer uso de estas funcionalidades hasta que la popularidad o uso de nuestro sitio web sea tanto que ya tengamos una ganancia solida frente a la que cualquiera de las tarifas es totalmente economica para los precios de la industria.


# Explicar la importancia de cloudflare, estadisticas, arquitectura, se dice que el 10% se sirven utilizando Cloudflare.

# Evita tener que montar/contratar/asegurar/mantener un servidor propio para nuestro backend.

# Velocidad de punta, tecnologias de alto rendimiento.

# Uso de tecnologias IA de todo tipo, traduccion, creacion de imagenes, creacion de textos y +.

# Creacion de tuneles seguros de conexion entre dispositivos y el servidor lo que da la posibilidad de sistemas OFFLINE FIRST (donde la informacion del negocio se encuentra en un equipo fisico del cliente y el mismo hace actualizaciones a internet, esto se contrapone a un sistema ONLINE FIRST donde la fuente de informacion se encuentra en internet y se requiere conexion para acceder a ella etc.)

# Opciones generosas para subida y transferencia de archivos utilizando los servicos Cloudfare R2, aunque no es una opcion que se utilice en todos los proyectos, es una opcion que puede ayudar en algunos rubros.





#           ______________
#           3 SOBRE NEXTJS
#

# Otras opciones que brinda nextJS
# copypasteo mejorado de generosidades de nextjs 



#          
#            4
#         





















# ###########################################################################################################################################
#  bla bla BLA BLA BLA BLA + 



# creacion de aplicacion para crear automaticamente lo relacionado a cloudflare/github, utilizando  sus CLI nativas 
(Wrangler y GitHUB CLI)

# esto facilitaria lo que es la configuracion permisos etc 
crea usuario via web etc (facil instruccion)
 
 EN VEZ DE OTORGAR ACCESO A USER DE LA AGENCIA Y QU ESTE CONFIGURE TODO

 se abre un GUI que va mandando la info introducida x el cmd

 creando los proyectos haciendo los deployment etc.









# STATIC DINAMIC...


# Sobre las implicancias de paginas dinamicas o estaticas

# Ejemplificar con mostrador donde se pregunta hora y dia, todo el dia el dia es el mismo asi que el recepcionista se acuerda que es x dia,  pero la hora es distinta.

# La eleccion entre servir paginas estaticas o dinamicas y todas las formas de implementar esas dos opciones son quizas lo que mas influye en el uso de recursos del servidor en la mayoria de los proyectos chicos o medianos, y es controlando estos parametros que podemos manejar el uso de recursos que se reflejara finalmente tanto en los gastos como la escalabilidad de los proyectos, cuando hablamos de escalabilidad, hablamos de la capacidad del sistema web para poder manejar lo que implica que el proyecto CREZCA (mas visitas, muy de golpe, poder agregar funcionalidades facilmente, poder manejar gran flujo de datos etc.)



# Un armado robusto y bien pensado hará que se utilicen solamente los recursos y las funciones necesarias.





















PROPUESTA

1
 para clientes directos (TODO)
2
 para agencias o freelancers (CM´s, MARKETING, ETC.)


1
 Invierta en desarrollo bien pensado,

 Gasta mensualmente pagando cuotas de una portal web de la puta madre
en vez de pagar tarifas de servicios que no te dan tantas opciones
para diferenciarte.

Sea dueño absoluto de todos los datos de su negocio,
 
 
2

 dale a tus clientes las mejores opciones

diferenciate de una manera simple: ofreceles a tus clientes mas servicios que nadie,
 
 hoy por hoy hay una creciente corriente en la industria donde son muchos los proveedores 
 que ofrecen un sistema tarifario ultra flexible, donde lo que ofrecen es la opcion de utilizar de manera gratuita sus servicios con limites muy generosos.

 utilizar servicios gratuitos que brindan las marcas lideres
 
 incluyendo de esta manera muchisimas funciones con gasto 0, sin vueltas
IA, autenticacion, data storage etc


 herramientas automatizadas, guias y material didactico e interactivo para vos y tus clientes

 sistema robusto y simple de altisimo rendimiento

