    import pagination from './pagination.js';
    Vue.component('pagination', pagination)

    var app = new Vue({
    el: '#app',
    data: {    
      productList:[],
      tempProduct:{imageUrl: []},
      api:{
          path:'https://course-ec-api.hexschool.io/api/',
          uuid:'603cb025-ce43-4d9c-bb8a-51732cf440ab'
      },
      event_id:'',
      mode:'',
      token:'',
      pagination: {},
    },
    methods:{
      btnAdd(){
          const vm = this;
          $('#fillProductModal').modal();
          vm.mode="add";
      },
      btnSave(){        
          const vm = this;
          if(vm.mode == "add")
          {
              
              vm.productList.push(vm.tempProduct);            
              const url = `${this.api.path}${this.api.uuid}/admin/ec/product`;
              //新增 使用post
              axios.post(url,vm.tempProduct).then((res) => {
                  console.log(res);   
                  this.btnQuery();             
              });
  
          }
          else if(vm.mode="edit")
          {
              
              console.log(vm.tempProduct);
              //未串api前寫法
              /*
              vm.productList.forEach(function(item, index, array) {
                  if(item.id == vm.tempProduct.id)
                  {                    
                     vm.productList[index] = vm.tempProduct;
                  }
              });
              */
  
              //串api後寫法
              const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${vm.tempProduct.id}`;
              //修改使用 patch
              axios.patch(url,vm.tempProduct).then((res) => {
                  console.log(res);                
                  this.btnQuery();
              });
  
  
          }
  
          
  
          vm.edit="";
          vm.tempProduct = {imageUrl: []};
          $('#fillProductModal').modal('hide');
      },
      btnEdit(item){
          const vm = this;
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;

          //未串api前寫法
          //vm.tempProduct = Object.assign({}, item);        

          //新增 使用post
          axios.get(url).then((res) => {
              console.log(res);   
              vm.tempProduct = res.data.data;              
              $('#fillProductModal').modal();
              vm.mode="edit";
          });

          
      },
      btnDeleteConfirm(e){
          const vm = this;   
          let event_id = e.target.dataset.id;
          vm.event_id = event_id;
          $('#deleteProductModal').modal();
      },
      btnDeleteYes(){      
            
          const vm = this;         
  
          //未串api前 寫法
          //vm.productList.splice(vm.event_id,1);
  
          //串api後 寫法
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${vm.event_id}`;
              axios.delete(url,vm.tempProduct).then((res) => {
                  console.log(res);                
                  this.btnQuery();
              });
  
          vm.event_id = "";
          $('#deleteProductModal').modal('hide');
          
      },
      btnQuery(num = 1){
          const vm = this;
          //const url = `${this.api.path}${this.api.uuid}/admin/ec/products?paged=5`;
          const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}&paged=5`;
          axios.get(url).then((res) => {
              console.log(res);
              vm.productList = res.data.data;
              vm.pagination  = res.data.meta.pagination;
        });
      }
    },
    created(){
      
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)kiteToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      //設定每次請求時headers 預設傳送 保存在cookies 的 token 值
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
      
      this.btnQuery();
  
    }
    
  })
          