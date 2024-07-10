import { Head, Script, ToggleTheme } from '../theme';

export const ProductForm = (props: { children?: string; screenTitle?: string }) => {
  return (
    <html lang='es' data-bs-theme='auto'>
        
      <Head />
      <body>
        <ToggleTheme />
        <header class='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
          <a class='navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6' href='/admin'>
            <img class='logo' src='/public/images/sonicjs-logo.svg' />
          </a>
          <h1 class='h2 px-3 me-auto'>{props.screenTitle}</h1>
        </header>

        <div class='container-fluid'>
          <div class='row'>
            <main class='col-10 offset-1 px-md-4 py-md-4'>
              <h2>Crear Producto</h2>
              <form id='formio-products'></form>
              {props.children}
              <button type='submit' form='formio-product' class='btn btn-primary mt-3'>Submit</button>
            </main>
          </div>
        </div>

        <Script />
      </body>
    </html>
  );
};

export async function loadProductForm(ctx) {
  return <ProductForm screenTitle='Crear Producto' />;
}
