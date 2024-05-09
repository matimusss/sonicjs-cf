import { ApiConfig, apiConfig } from '../../../db/routes';
import { getDataListByPrefix } from '../../data/kv-data';
import { Bindings } from '../../types/bindings';
import { Layout } from '../theme';

export async function loadAdminTable(ctx) {
  // await saveKVData(ctx.env.KVDATA, 'site1', 'content', {title: '20230508a'});

  // const content = await getAllContent(ctx.env.D1DATA);
  // const content = await getAllContent(ctx.env.D1DATA);

  let content = await getDataListByPrefix(ctx.env.KVDATA);

  content.keys.reverse();

  console.log('content==>', JSON.stringify(content, null, 2));

  // console.log("load admin data", content);

  const contentList = content.keys.map((item) => {
    const id = item.metadata.id;
    const route = item.metadata.route;
    // const table = item.name.split('::')[1];
    // console.log("item-->", JSON.stringify(item, null, 2));

    const updatedOn = item.metadata.updatedOn;
    // console.log("updatedOn-->", updatedOn);

    return {
      id: item.name,
      title: item.name,
      updatedOn: updatedOn,
      editPath: `/admin/content/edit/${route}/${id}`,
      newPath: `/admin/content/new/${item.name}`
    };
  });

  // console.log("contentList-->", JSON.stringify(contentList, null, 2));

  return (
    <TopContentList
      content={contentList}
      tableList={apiConfig}
      screenTitle='Content'
      username={ctx.get('user')?.email}
      env={ctx.env}
    />
  );
}

export async function loadTableData(ctx, route) {
  // await saveKVData(ctx.env.KVDATA, 'site1', 'content', {title: '20230508a'});
  // console.log("loadTableData==>", route);
  const table = apiConfig.find((entry) => entry.route === route).table;
  if (ctx._path?.includes('auth')) {
    route = `auth/${route}`;
  }
  // const results = await getD1DataByTable(ctx.env.D1DATA, table, undefined);

  // results.reverse();
  // const content = await getAllContent(ctx.env.D1DATA);
  // console.log('data==>', JSON.stringify(data, null, 2))

  // const contentTypes = await getDataListByPrefix(
  //   ctx.env.KVDATA,
  //   "site1::content-type::"
  // );

  // console.log("load admin data", content);

  // const contentList = results.map((item) => {
  //   return {
  //     id: item.id,
  //     title: getDisplayField(item),
  //     updatedOn: item.updatedOn,
  //     editPath: `/admin/content/edit/${route}/${item.id}`,
  //   };
  // });

  return (
    <TopContentTable
      env={ctx.env}
      username={ctx.get('user')?.email}
      route={route}
      table={table}
    />
  );
}

export async function loadInMemoryCacheTable(ctx) {
  const cache_ttl = (ctx.env && ctx.env.cache_ttl) ?? 20 * 60 * 1000;

  return (
    <Layout
      env={ctx.env}
      username={ctx.get('user')?.email}
      screenTitle={'In Memory Cache'}
    >
      <div class='row'>
        <div class='col-md-12'>
          <div class='pb-2 mb-3'>
            <button id='clear-cache-in-memory' class='btn btn-warning'>
              Clear In Memory Cache
            </button>
          </div>

          <div id='grid-in-memory-cache'></div>
        </div>
      </div>
    </Layout>
  );
}

export async function loadKVCacheTable(ctx) {
  return (
    <Layout
      env={ctx.env}
      username={ctx.get('user')?.email}
      screenTitle={'KV Cache'}
    >
      <div class='row'>
        <div class='col-md-12'>
          <div class='pb-2 mb-3'>
            <button id='clear-cache-kv' class='btn btn-warning'>
              Clear KV Cache
            </button>
          </div>

          <div id='grid-kv-cache'></div>
        </div>
      </div>
    </Layout>
  );
}

export async function loadKVCacheDetail(ctx, kv) {
  return (
    <Layout
      env={ctx.env}
      username={ctx.get('user')?.email}
      screenTitle={'KV Item Detail'}
    >
      <div class='row'>
        <div class='col-md-12'>
          <div class='pb-2 mb-3'>
            <button id='clear-cache-kv' class='btn btn-warning'>
              Clear KV Cache
            </button>
          </div>

          <textarea rows={24} style='width: 100%; max-width: 100%;'>
            {JSON.stringify(kv, null, 2)}
          </textarea>
        </div>
      </div>
    </Layout>
  );
}

export async function loadInMemoryCacheDetail(ctx, kv) {
  return (
    <Layout
      env={ctx.env}
      username={ctx.get('user')?.email}
      screenTitle={'In Memory Item Detail'}
    >
      <div class='row'>
        <div class='col-md-12'>
          <div class='pb-2 mb-3'>
            <button id='clear-in-memory-kv' class='btn btn-warning'>
              Clear In Memory Cache
            </button>
          </div>

          <textarea rows={24} style='width: 100%; max-width: 100%;'>
            {JSON.stringify(kv, null, 2)}
          </textarea>
        </div>
      </div>
    </Layout>
  );
}

function getDisplayField(item) {
  return item.name ?? item.title ?? item.firstName ?? item.id ?? 'record';
}

export async function loadAdmin(ctx) {
  // await saveKVData(ctx.env.KVDATA, 'site1', 'content', {title: '20230508a'});

  const content = await getDataListByPrefix(ctx.env.KVDATA, 'site1::content::');
  // const content = await getAllContent(ctx.env.D1DATA);
  console.log('content==>', content);

  const contentTypes = await getDataListByPrefix(
    ctx.env.KVDATA,
    'site1::content-type::'
  );

  // console.log("load admin data", content);

  const contentList = content.key.map((item) => {
    return {
      title: item.name,
      editPath: `/admin/content/edit/${item.name}`,
      newPath: `/admin/content/new/${item.name}`
    };
  });

  const contentTypeList = contentTypes.keys.map((item) => {
    return {
      table: item.name,
      route: item.name
    };
  });

  return (
    <TopContentList
      env={ctx.env}
      content={contentList}
      tableList={contentTypeList}
      screenTitle='Content'
      username={ctx.get('user')?.email}
    />
  );
}

// export async function loadNewContent(ctx, id) {
//   console.log("loadContent id", id);

//   const data = await getById(ctx.env.KVDATA, id);
//   console.log("loadContent--????", id, data);
//   const contentType = getContentType(data);
//   return (
//     <Form
//       title={contentType}
//       saveButtonText="Save Content Type"
//       screenTitle="Content Type"
//     />
//   );
// }

export async function loadEditContent(ctx, route, id, tbl?: string) {
  // const content = await getD1ByTableAndId(ctx.env.D1DATA, table, id);
  // console.log("loadEditContent", id, content);
  const table = tbl || apiConfig.find((entry) => entry.route === route).table;

  // console.log('loadEditContent content type', contentType)

  return (
    <ContentEditForm
      env={ctx.env}
      saveButtonText='Save Content Type'
      screenTitle='Content Type'
      contentId={id}
      table={table}
      route={route}
      username={ctx.get('user')?.email}
    />
  );
}

export async function loadNewContent(ctx, route, tbl?: string) {
  // const content = await getD1ByTableAndId(ctx.env.D1DATA, table, id);
  // console.log("loadEditContent", id, content);

  const table = tbl || apiConfig.find((entry) => entry.route === route).table;

  console.log('loadNewContent', route, table);

  return (
    <ContentNewForm
      env={ctx.env}
      username={ctx.get('user')?.email}
      route={route}
      table={table}
    />
  );
}

function editScript() {
  return console.log('hello');
}

export const FileModal = () => {
  return (
    <div
      class='modal fade'
      id='fileModal'
      tabindex={-1}
      aria-labelledby='fileModalLabel'
      aria-hidden='true'
    >
      <div class='modal-dialog'>
        <div class='modal-content'>
          <div class='modal-header'>
            <h1 class='modal-title fs-5' id='fileModalLabel'>
              Modal title
            </h1>
            <button
              type='button'
              class='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'
            ></button>
          </div>
          <div class='modal-body'>
            <ul class='nav nav-tabs' id='myTab' role='tablist'>
              <li class='nav-item' role='presentation'>
                <button
                  class='nav-link active'
                  id='image-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#image-tab-pane'
                  type='button'
                  role='tab'
                  aria-controls='image-tab-pane'
                  aria-selected='true'
                >
                  Images
                </button>
              </li>
              <li class='nav-item' role='presentation'>
                <button
                  class='nav-link'
                  id='file-tab'
                  data-bs-toggle='tab'
                  data-bs-target='#file-tab-pane'
                  type='button'
                  role='tab'
                  aria-controls='file-tab-pane'
                  aria-selected='false'
                >
                  Files
                </button>
              </li>
            </ul>
            <div class='tab-content' id='myTabContent'>
              <div
                class='tab-pane fade show active'
                id='image-tab-pane'
                role='tabpanel'
                aria-labelledby='image-tab'
                tabIndex={0}
              >
                <div class='gallery'>
                  <div class='gallery-column'></div>
                  <div class='gallery-column'></div>
                  <div class='gallery-column'></div>
                  <div class='gallery-column'></div>
                </div>
              </div>
              <div
                class='tab-pane fade'
                id='file-tab-pane'
                role='tabpanel'
                aria-labelledby='file-tab'
                tabIndex={0}
              ></div>
            </div>
          </div>
          <div class='modal-footer'>
            <button
              type='button'
              class='btn btn-secondary'
              data-bs-dismiss='modal'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export const ContentEditForm = (props: {
  screenTitle: string;
  saveButtonText: string;
  contentId: string;
  table: string;
  route: string;
  username?: string;
  env: Bindings;
}) => {
  return (
    <Layout
      env={props.env}
      username={props.username}
      screenTitle={'Edit: ' + props.contentId}
    >
      <div id='formio' data-id={props.contentId} data-route={props.route}></div>
      <FileModal />
    </Layout>
  );
};

export const ContentNewForm = (props: {
  table: string;
  route: string;
  username?: string;
  env: Bindings;
}) => {
  return (
    <Layout
      env={props.env}
      screenTitle={'New: ' + props.table}
      username={props.username}
    >
      <div id='formio' data-route={props.route}></div>
      <FileModal />
    </Layout>
  );
};

export const TopContentList = (props: {
  content: object[];
  tableList: ApiConfig[];
  screenTitle: string;
  username?: string;
  env: Bindings;
}) => {
  return (
    <Layout
      env={props.env}
      username={props.username}
      screenTitle={props.screenTitle}
    >
      <div class='row'>
        <div class='col-md-8'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Record</th>
                <th scope='col'>Created</th>
                <th scope='col'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {props.content.map((item: any) => {
                return (
                  <tr>
                    <td scope='row'>
                      {' '}
                      <a class='' href={item.editPath}>
                        {item.title}
                      </a>
                    </td>
                    <td scope='row'>
                      <time class='timeSince' datetime={item.updatedOn}>
                        {item.updatedOn}
                      </time>
                    </td>
                    <td>
                      <a
                        href='javascript:void(0)'
                        data-id={item.id}
                        class='btn btn-outline-warning btn-sm delete-content'
                        onClick="return confirm('Delete forever?') ? updateContent(data-id) : false;"
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class='col-md-4'>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>New Content</th>
              </tr>
            </thead>
            <tbody>
              {props.tableList.map((item) => {
                return (
                  <tr>
                    <td>
                      <a
                        href={'/admin/content/new/' + item.route}
                        class='btn btn-warning'
                      >
                        New {item.table} record
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export const TopContentTable = (props: {
  table: string;
  route: string;
  username?: string;
  env: Bindings;
}) => {
  return (
    <Layout env={props.env} username={props.username} screenTitle={props.table}>
      <div class='row'>
        <div class='col-md-12'>
          <div class='pb-2 mb-3'>
            {/* <!-- Button trigger modal --> */}
            <a
              href={'/admin/content/new/' + props.route}
              class='btn btn-warning'
            >
              New {props.table} record
            </a>
          </div>
          <div id='grid' data-route={props.table}></div>
          <div id='executionTime' class='p-4 text-center text-muted hide'>
            Data Retrieval - <b>Server</b>: <span class='serverTime'></span>ms,{' '}
            <b>Client</b>: <span class='clientTime'></span>ms. <b>Source</b>:{' '}
            <span class='source'></span>
          </div>

          {/* <table class="table">
            <thead>
              <tr>
                <th scope="col">Record</th>
                <th scope="col">Created</th>
              </tr>
            </thead>
            <tbody>
              {props.content.map((item: any) => {
                return (
                  <tr>
                    <td scope="row">
                      {" "}
                      <a class="" href={item.editPath}>
                        {item.title}
                      </a>
                    </td>
                    <td scope="row">
                      <time class="timeSince" datetime={item.updatedOn}>
                        {item.updatedOn}
                      </time>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table> */}
        </div>
      </div>
    </Layout>
  );
};


export async function prueba(ctx) {
  return (
    <Layout
      env={ctx.env}
      username={ctx.get('user')?.email}
      screenTitle={'PRUEBA'}
    >
  
      <div>
        DIV DE PRUEBA  . ASD
      </div>
    </Layout>
  );
}








export async function prueba2(ctx) {
  return (<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>GrapesJS Demo - Free Open Source Website Page Builder</title>
    <meta content="Best Free Open Source Responsive Websites Builder" name="description">
    <link rel="stylesheet" href="stylesheets/toastr.min.css">
    <link rel="stylesheet" href="stylesheets/grapes.min.css?v0.21.10">
    <link rel="stylesheet" href="stylesheets/grapesjs-preset-webpage.min.css">
    <link rel="stylesheet" href="stylesheets/tooltip.css">
    <link rel="stylesheet" href="stylesheets/demos.css?v3">
    <link href="https://unpkg.com/grapick/dist/grapick.min.css" rel="stylesheet">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="js/toastr.min.js"></script>
    <script src="js/grapes.min.js?v0.21.10"></script>
    <script src="https://unpkg.com/grapesjs-preset-webpage@1.0.2"></script>
    <script src="https://unpkg.com/grapesjs-blocks-basic@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-plugin-forms@2.0.5"></script>
    <script src="https://unpkg.com/grapesjs-component-countdown@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-plugin-export@1.0.11"></script>
    <script src="https://unpkg.com/grapesjs-tabs@1.0.6"></script>
    <script src="https://unpkg.com/grapesjs-custom-code@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-touch@0.1.1"></script>
    <script src="https://unpkg.com/grapesjs-parser-postcss@1.0.1"></script>
    <script src="https://unpkg.com/grapesjs-tooltip@0.1.7"></script>
    <script src="https://unpkg.com/grapesjs-tui-image-editor@0.1.3"></script>
    <script src="https://unpkg.com/grapesjs-typed@1.0.5"></script>
    <script src="https://unpkg.com/grapesjs-style-bg@2.0.1"></script>

    <style type="text/css">
        .icons-flex {
          background-size: 70% 65% !important;
          height: 15px;
          width: 17px;
          opacity: 0.9;
        }
        .icon-dir-row {
          background: url("./img/flex-dir-row.png") no-repeat center;
        }
        .icon-dir-row-rev {
          background: url("./img/flex-dir-row-rev.png") no-repeat center;
        }
        .icon-dir-col {
          background: url("./img/flex-dir-col.png") no-repeat center;
        }
        .icon-dir-col-rev {
          background: url("./img/flex-dir-col-rev.png") no-repeat center;
        }
        .icon-just-start{
         background: url("./img/flex-just-start.png") no-repeat center;
        }
        .icon-just-end{
         background: url("./img/flex-just-end.png") no-repeat center;
        }
        .icon-just-sp-bet{
         background: url("./img/flex-just-sp-bet.png") no-repeat center;
        }
        .icon-just-sp-ar{
         background: url("./img/flex-just-sp-ar.png") no-repeat center;
        }
        .icon-just-sp-cent{
         background: url("./img/flex-just-sp-cent.png") no-repeat center;
        }
        .icon-al-start{
         background: url("./img/flex-al-start.png") no-repeat center;
        }
        .icon-al-end{
         background: url("./img/flex-al-end.png") no-repeat center;
        }
        .icon-al-str{
         background: url("./img/flex-al-str.png") no-repeat center;
        }
        .icon-al-center{
         background: url("./img/flex-al-center.png") no-repeat center;
        }

         [data-tooltip]::after {
           background: rgba(51, 51, 51, 0.9);
         }

         .gjs-pn-commands {
           min-height: 40px;
         }

         #gjs-sm-float {
            display: none;
         }

         .gjs-logo-version {
           background-color: #756467;
         }

        .gjs-pn-btn.gjs-pn-active {
          box-shadow: none;
        }

        .CodeMirror {
          min-height: 450px;
          margin-bottom: 8px;
        }
        .grp-handler-close {
          background-color: transparent;
          color: #ddd;
        }

        .grp-handler-cp-wrap {
          border-color: transparent;
        }
    </style>
  </head>
  <body>
    <div style="display: none">
      <div class="gjs-logo-cont">
        <a href="https://grapesjs.com"><img class="gjs-logo" src="img/grapesjs-logo-cl.png"></a>
        <div class="gjs-logo-version">asdasd</div>
      </div>
    </div>



    <div id="gjs" style="height:0px; overflow:hidden">
    
    </div>




    <script type="text/javascript">
      var lp = './img/';
      var plp = 'https://via.placeholder.com/350x250/';
      var images = [
        lp + 'team1.jpg',
        lp + 'team2.jpg',
        lp + 'team3.jpg',
        plp + '78c5d6/fff',
        plp + '459ba8/fff',
        plp + '79c267/fff',
        plp + 'c5d647/fff',
        plp + 'f28c33/fff',
        plp + 'e868a2/fff',
        plp + 'cc4360/fff',
        lp + 'work-desk.jpg',
        lp + 'phone-app.png',
        lp + 'bg-gr-v.png'
      ];

      var editor  = grapesjs.init({
        height: '100%',
        container : '#gjs',
        fromElement: true,
        showOffsets: true,
        assetManager: {
          embedAsBase64: true,
          assets: images
        },
        selectorManager: { componentFirst: true },
        styleManager: {
          sectors: [{
              name: 'General',
              properties:[
                {
                  extend: 'float',
                  type: 'radio',
                  default: 'none',
                  options: [
                    { value: 'none', className: 'fa fa-times'},
                    { value: 'left', className: 'fa fa-align-left'},
                    { value: 'right', className: 'fa fa-align-right'}
                  ],
                },
                'display',
                { extend: 'position', type: 'select' },
                'top',
                'right',
                'left',
                'bottom',
              ],
            }, {
                name: 'Dimension',
                open: false,
                properties: [
                  'width',
                  {
                    id: 'flex-width',
                    type: 'integer',
                    name: 'Width',
                    units: ['px', '%'],
                    property: 'flex-basis',
                    toRequire: 1,
                  },
                  'height',
                  'max-width',
                  'min-height',
                  'margin',
                  'padding'
                ],
              },{
                name: 'Typography',
                open: false,
                properties: [
                    'font-family',
                    'font-size',
                    'font-weight',
                    'letter-spacing',
                    'color',
                    'line-height',
                    {
                      extend: 'text-align',
                      options: [
                        { id : 'left',  label : 'Left',    className: 'fa fa-align-left'},
                        { id : 'center',  label : 'Center',  className: 'fa fa-align-center' },
                        { id : 'right',   label : 'Right',   className: 'fa fa-align-right'},
                        { id : 'justify', label : 'Justify',   className: 'fa fa-align-justify'}
                      ],
                    },
                    {
                      property: 'text-decoration',
                      type: 'radio',
                      default: 'none',
                      options: [
                        { id: 'none', label: 'None', className: 'fa fa-times'},
                        { id: 'underline', label: 'underline', className: 'fa fa-underline' },
                        { id: 'line-through', label: 'Line-through', className: 'fa fa-strikethrough'}
                      ],
                    },
                    'text-shadow'
                ],
              },{
                name: 'Decorations',
                open: false,
                properties: [
                  'opacity',
                  'border-radius',
                  'border',
                  'box-shadow',
                  'background', // { id: 'background-bg', property: 'background', type: 'bg' }
                ],
              },{
                name: 'Extra',
                open: false,
                buildProps: [
                  'transition',
                  'perspective',
                  'transform'
                ],
              },{
                name: 'Flex',
                open: false,
                properties: [{
                  name: 'Flex Container',
                  property: 'display',
                  type: 'select',
                  defaults: 'block',
                  list: [
                    { value: 'block', name: 'Disable'},
                    { value: 'flex', name: 'Enable'}
                  ],
                },{
                  name: 'Flex Parent',
                  property: 'label-parent-flex',
                  type: 'integer',
                },{
                  name: 'Direction',
                  property: 'flex-direction',
                  type: 'radio',
                  defaults: 'row',
                  list: [{
                    value: 'row',
                    name: 'Row',
                    className: 'icons-flex icon-dir-row',
                    title: 'Row',
                  },{
                    value: 'row-reverse',
                    name: 'Row reverse',
                    className: 'icons-flex icon-dir-row-rev',
                    title: 'Row reverse',
                  },{
                    value: 'column',
                    name: 'Column',
                    title: 'Column',
                    className: 'icons-flex icon-dir-col',
                  },{
                    value: 'column-reverse',
                    name: 'Column reverse',
                    title: 'Column reverse',
                    className: 'icons-flex icon-dir-col-rev',
                  }],
                },{
                  name: 'Justify',
                  property: 'justify-content',
                  type: 'radio',
                  defaults: 'flex-start',
                  list: [{
                    value: 'flex-start',
                    className: 'icons-flex icon-just-start',
                    title: 'Start',
                  },{
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-just-end',
                  },{
                    value: 'space-between',
                    title: 'Space between',
                    className: 'icons-flex icon-just-sp-bet',
                  },{
                    value: 'space-around',
                    title: 'Space around',
                    className: 'icons-flex icon-just-sp-ar',
                  },{
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-just-sp-cent',
                  }],
                },{
                  name: 'Align',
                  property: 'align-items',
                  type: 'radio',
                  defaults: 'center',
                  list: [{
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start',
                  },{
                    value: 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end',
                  },{
                    value: 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str',
                  },{
                    value: 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center',
                  }],
                },{
                  name: 'Flex Children',
                  property: 'label-parent-flex',
                  type: 'integer',
                },{
                  name: 'Order',
                  property: 'order',
                  type: 'integer',
                  defaults: 0,
                  min: 0
                },{
                  name: 'Flex',
                  property: 'flex',
                  type: 'composite',
                  properties  : [{
                    name: 'Grow',
                    property: 'flex-grow',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },{
                    name: 'Shrink',
                    property: 'flex-shrink',
                    type: 'integer',
                    defaults: 0,
                    min: 0
                  },{
                    name: 'Basis',
                    property: 'flex-basis',
                    type: 'integer',
                    units: ['px','%',''],
                    unit: '',
                    defaults: 'auto',
                  }],
                },{
                  name: 'Align',
                  property: 'align-self',
                  type: 'radio',
                  defaults: 'auto',
                  list: [{
                    value: 'auto',
                    name: 'Auto',
                  },{
                    value: 'flex-start',
                    title: 'Start',
                    className: 'icons-flex icon-al-start',
                  },{
                    value   : 'flex-end',
                    title: 'End',
                    className: 'icons-flex icon-al-end',
                  },{
                    value   : 'stretch',
                    title: 'Stretch',
                    className: 'icons-flex icon-al-str',
                  },{
                    value   : 'center',
                    title: 'Center',
                    className: 'icons-flex icon-al-center',
                  }],
                }]
              }
            ],
        },
        plugins: [
          'gjs-blocks-basic',
          'grapesjs-plugin-forms',
          'grapesjs-component-countdown',
          'grapesjs-plugin-export',
          'grapesjs-tabs',
          'grapesjs-custom-code',
          'grapesjs-touch',
          'grapesjs-parser-postcss',
          'grapesjs-tooltip',
          'grapesjs-tui-image-editor',
          'grapesjs-typed',
          'grapesjs-style-bg',
          'grapesjs-preset-webpage',
        ],
        pluginsOpts: {
          'gjs-blocks-basic': { flexGrid: true },
          'grapesjs-tui-image-editor': {
            script: [
              // 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.6.7/fabric.min.js',
              'https://uicdn.toast.com/tui.code-snippet/v1.5.2/tui-code-snippet.min.js',
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.js',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.js'
            ],
            style: [
              'https://uicdn.toast.com/tui-color-picker/v2.2.7/tui-color-picker.min.css',
              'https://uicdn.toast.com/tui-image-editor/v3.15.2/tui-image-editor.min.css',
            ],
          },
          'grapesjs-tabs': {
            tabsBlock: { category: 'Extra' }
          },
          'grapesjs-typed': {
            block: {
              category: 'Extra',
              content: {
                type: 'typed',
                'type-speed': 40,
                strings: [
                  'Text row one',
                  'Text row two',
                  'Text row three',
                ],
              }
            }
          },
          'grapesjs-preset-webpage': {
            modalImportTitle: 'Import Template',
            modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
            modalImportContent: function(editor) {
              return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
            },
          },
        },
      });

      editor.I18n.addMessages({
        en: {
          styleManager: {
            properties: {
              'background-repeat': 'Repeat',
              'background-position': 'Position',
              'background-attachment': 'Attachment',
              'background-size': 'Size',
            }
          },
        }
      });

      var pn = editor.Panels;
      var modal = editor.Modal;
      var cmdm = editor.Commands;

      // Update canvas-clear command
      cmdm.add('canvas-clear', function() {
        if(confirm('Are you sure to clean the canvas?')) {
          editor.runCommand('core:canvas-clear')
          setTimeout(function(){ localStorage.clear()}, 0)
        }
      });

      // Add info command
      var mdlClass = 'gjs-mdl-dialog-sm';
      var infoContainer = document.getElementById('info-panel');

      cmdm.add('open-info', function() {
        var mdlDialog = document.querySelector('.gjs-mdl-dialog');
        mdlDialog.className += ' ' + mdlClass;
        infoContainer.style.display = 'block';
        modal.setTitle('About this demo');
        modal.setContent(infoContainer);
        modal.open();
        modal.getModel().once('change:open', function() {
          mdlDialog.className = mdlDialog.className.replace(mdlClass, '');
        })
      });

      pn.addButton('options', {
        id: 'open-info',
        className: 'fa fa-question-circle',
        command: function() { editor.runCommand('open-info') },
        attributes: {
          'title': 'About',
          'data-tooltip-pos': 'bottom',
        },
      });


      // Simple warn notifier
      var origWarn = console.warn;
      toastr.options = {
        closeButton: true,
        preventDuplicates: true,
        showDuration: 250,
        hideDuration: 150
      };
      console.warn = function (msg) {
        if (msg.indexOf('[undefined]') == -1) {
          toastr.warning(msg);
        }
        origWarn(msg);
      };


      // Add and beautify tooltips
      [['sw-visibility', 'Show Borders'], ['preview', 'Preview'], ['fullscreen', 'Fullscreen'],
       ['export-template', 'Export'], ['undo', 'Undo'], ['redo', 'Redo'],
       ['gjs-open-import-webpage', 'Import'], ['canvas-clear', 'Clear canvas']]
      .forEach(function(item) {
        pn.getButton('options', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
      });
      [['open-sm', 'Style Manager'], ['open-layers', 'Layers'], ['open-blocks', 'Blocks']]
      .forEach(function(item) {
        pn.getButton('views', item[0]).set('attributes', {title: item[1], 'data-tooltip-pos': 'bottom'});
      });
      var titles = document.querySelectorAll('*[title]');

      for (var i = 0; i < titles.length; i++) {
        var el = titles[i];
        var title = el.getAttribute('title');
        title = title ? title.trim(): '';
        if(!title)
          break;
        el.setAttribute('data-tooltip', title);
        el.setAttribute('title', '');
      }


      // Store and load events
      editor.on('storage:load', function(e) { console.log('Loaded ', e) });
      editor.on('storage:store', function(e) { console.log('Stored ', e) });


      // Do stuff on load
      editor.on('load', function() { 
        var $ = grapesjs.$;

        // Show borders by default
        pn.getButton('options', 'sw-visibility').set({
          command: 'core:component-outline',
          'active': true,
        });

        // Show logo with the version
        var logoCont = document.querySelector('.gjs-logo-cont');
        document.querySelector('.gjs-logo-version').innerHTML = 'v' + grapesjs.version;
        var logoPanel = document.querySelector('.gjs-pn-commands');
        logoPanel.appendChild(logoCont);


        // Load and show settings and style manager
        var openTmBtn = pn.getButton('views', 'open-tm');
        openTmBtn && openTmBtn.set('active', 1);
        var openSm = pn.getButton('views', 'open-sm');
        openSm && openSm.set('active', 1);

        // Remove trait view
        pn.removeButton('views', 'open-tm');

        // Add Settings Sector
        var traitsSector = $('<div class="gjs-sm-sector no-select">'+
          '<div class="gjs-sm-sector-title"><span class="icon-settings fa fa-cog"></span> <span class="gjs-sm-sector-label">Settings</span></div>' +
          '<div class="gjs-sm-properties" style="display: none;"></div></div>');
        var traitsProps = traitsSector.find('.gjs-sm-properties');
        traitsProps.append($('.gjs-traits-cs'));
        $('.gjs-sm-sectors').before(traitsSector);
        traitsSector.find('.gjs-sm-sector-title').on('click', function(){
          var traitStyle = traitsProps.get(0).style;
          var hidden = traitStyle.display == 'none';
          if (hidden) {
            traitStyle.display = 'block';
          } else {
            traitStyle.display = 'none';
          }
        });

        // Open block manager
        var openBlocksBtn = editor.Panels.getButton('views', 'open-blocks');
        openBlocksBtn && openBlocksBtn.set('active', 1);

        // Move Ad
        $('#gjs').append($('.ad-cont'));
      });



      ga('create', 'UA-74284223-1', 'auto');
      ga('send', 'pageview');
    </script>
  </body>
</html>
  );
}
