$(function () {

App = {};
App.Model = {};
App.Collection = {};
App.View = {};
// Model

  App.Model.Task = Backbone.Model.extend({
    defaults: {
      title: 'Test',
      description: 'test',
      estimation: 'test',
      assigned: 'test',
      status: 'open'
    },

    /**toggle: function () {
      this.save({done: !this.get('done')});
    }**/

  });

  App.Collection.TasksCollection = Backbone.Collection.extend({
    model: App.Model.Task,
    url: '/tasks',
    
    getOpenTask: function() {
       return this.where({status: 'open'});
    },
    
    getInProgressTask: function(){
        return this.where({status: 'inprogress'});
    },
    getCompletedTask: function() {
        return this.where({status: 'completed'});
    },
    
    open: function() {
      console.log('fetching open');
      this.fetch({async:false, reset: true});
      this.reset();
      this.trigger('reload');
    },
    completed: function() {
      console.log('fetching completed');
      this.fetch({async:false, reset: true});
      this.reset(this.where({status: 'completed'}));
      this.trigger('reload');
    },

    inprogress: function() {
      console.log('fetching inprogress');
      this.fetch({async:false, reset: true});
      this.reset(this.where({status: 'inprogress'}));
      this.trigger('reload');
    },
    all: function() {
      console.log('fetching all');
      this.fetch({async:false, reset: true});
      this.reset();
      this.trigger('reload');
    }
  });




  App.View.TaskView = Backbone.View.extend({

    el: '#Scrum',

    template: _.template($('#item-template').html()),

    events: {
      //"dblclick .view": "edit",
      //"keypress .grpedit": "updateOnEnter",
      "keypress .edit": "updateOnEnter",
      "blur .edit": "close",
      "click .moveRight": "moveRight",
      "click .moveLeft": "moveLeft",
      //"dblclick .editing": "editing",
      "dblclick .view-title": 'editTitle',
      "blur .edit-title": 'closeTitle',
      "dblclick .view-description": 'editDescription',
      "blur .edit-description": 'closeDescription',
      "dblclick .view-estimation": 'editEstimation',
      "blur .edit-estimation": 'closeEstimation',
      "dblclick .view-assigned": 'editAssigned',
      "blur .edit-assigned": 'closeAssigned',
      "click .deleteItem": 'deleteItem'
      
    },

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      //console.log("Bollmann "+this.$el);
      
      $('#task-list-open').html(this.template({tasks: this.model.getOpenTask()}));
      $('#task-list-inprogress').html(this.template({tasks: this.model.getInProgressTask()}));
      $('#task-list-completed').html(this.template({tasks: this.model.getCompletedTask()}));
      this.$el.html(this.template(this.model.toJSON()));
      //this.$el.toggleClass('done', this.model.get('done'));
      /**this.input = this.$('.edit');
      this.description = this.$('ed-description');
      this.estimation = this.$('ed-estimation');
      this.assigned = this.$('ed-assigned');**/
      return this;
    },
    /**toggleDone: function () {
      console.log('toggle model');
      this.model.toggle();
    },
    edit: function () {
      this.$el.addClass("edit");
      console.log("editing");
      this.input.focus();
    },
    close: function () {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },**/
    
    closeTitle: function (event) {
        var value = $(event.currentTarget).val();
        if (!value) {
            this.clear();
        } else {
            this.model.get($(event.currentTarget).parent().data('model-id')).save({title: value});
            $(event.currentTarget).parent().removeClass("editing-title");
        }
    },
    editTitle: function(event){
        console.log("adding editing Title");
        $(event.currentTarget).parent().addClass("editing-title");
        $(event.currentTarget).focus();
    },
    closeDescription: function (event) {
        var value = $(event.currentTarget).val();
        if (!value) {
            this.clear();
        } else {
            this.model.get($(event.currentTarget).parent().data('model-id')).save({description: value});
            $(event.currentTarget).parent().removeClass("editing-description");
        }
    },
    editDescription: function(){
        console.log("adding editing Description");
        $(event.currentTarget).parent().addClass("editing-description");
        $(event.currentTarget).focus();
    },
    closeEstimation: function () {
        var value = $(event.currentTarget).val();
        if (!value) {
            this.clear();
        } else {
            this.model.get($(event.currentTarget).parent().data('model-id')).save({estimation: value});
            $(event.currentTarget).parent().removeClass("editing-estimation");
        }
    },
    editEstimation: function(){
        console.log("adding editing Estimation");
        $(event.currentTarget).parent().addClass("editing-estimation");
        $(event.currentTarget).focus();
    },
    closeAssigned: function () {
        var value = $(event.currentTarget).val();
        if (!value) {
            this.clear();
        } else {
            his.model.get($(event.currentTarget).parent().data('model-id')).save({assigned: value});
            $(event.currentTarget).parent().removeClass("editing-assigned");
        }
    },
    editAssigned: function(){
        console.log("adding editing Assigned");
        $(event.currentTarget).parent().addClass("editing-assigned");
        $(event.currentTarget).focus();
    },
    
    updateOnEnter: function (e) {
      if (e.keyCode == 13){
          this.close();
      }
    },
    moveRight: function(event) {
        console.log("move Right");
        var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
        if (actualModel.get('status') == 'open'){
            console.log("open--progress");
            actualModel.save({status: 'inprogress'});
            actualModel.trigger('reload');
            
            
        }else if(actualModel.get('status')  == 'inprogress'){
            actualModel.save({status: 'completed'});
            actualModel.trigger('reload');
            
            
        }
                
    },
    moveLeft: function(event) {
        console.log("move Left");
        var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
        if (actualModel.get('status') == 'inprogress'){
            actualModel.save({status: 'open'});
            actualModel.trigger('reload');
            
            
        }
        else if(actualModel.get('status') == 'completed'){
            actualModel.save({status: 'inprogress'});
            actualModel.trigger('reload');
            
            
        }
    },
    deleteItem: function(event){

        var actualModel = this.model.get($(event.currentTarget).parent().data('model-id'));
        console.log("delete Item"+actualModel);
        actualModel.destroy();
    }

  });

  // Router

  var TaskRouter = Backbone.Router.extend({

    routes: {
      '' : 'showAllTasks',
      'open': 'showOpenTasks',
      'inprogress': 'showInProgressTask',
      'completed' : 'showCompletedTasks'
    },

    setApp: function(app) {
      this.app = app;
    },

    index: function() {
      console.log('we are in the index');
      this.app.showAll();
    },
    showAllTasks: function() {
      console.log('showing all tasks');
      this.app.showAll();
    },
    /**showFirstTasks: function() {
        console.log('showing all tasks');
        this.app.showFirst();
      },**/
    showOpenTasks: function() {
      console.log('showing open task');
      this.app.showOpen();
    },
    showCompletedTasks: function() {
      console.log('showing completed tasks');
      this.app.showCompleted();
    },
    showInProgressTask: function() {
      console.log('showing inprogress tasks');
      this.app.showInProgress();
    }

  });


  var TaskList = Backbone.View.extend({
    el: '#taskapp',


    events: {
      'click #add-item': 'createItem',
      'keypress #new-task': 'createItemOnEnter'
    },

    initialize: function () {
      this.tasks =  new App.Collection.TasksCollection();
      console.log('tasks initialized');
      this.input = $('#new-task');
      this.description = $('#new-task-description');
      this.estimation = $('#new-task-estimation');
      this.assigned = $('#new-task-assigned');
      this.list = $('#task-list');

      this.listenTo(this.tasks, 'add', this.addItem);
      this.listenTo(this.tasks, 'all', this.addItem);
      // this.listenTo(this.todos, 'reset', this.reload);
      this.listenTo(this.tasks, 'reload', this.reload);
      this.tasks.all();
      this.tasks.fetch({async:false, reset: true});

    },

    addItem: function () {  
        var that = this;
      $('#add-item', this.$el).click(function() {
          console.log('togert');
          that.createItem();
      });
        
      var taskView = new App.View.TaskView({ model: this.tasks });
      this.list.append(taskView.render().el);
    },

    addAll: function () {
      console.log('addAll');
      this.tasks.each(this.addItem, this);
    },

    reload: function() {
      console.log('reloading');
      this.list.empty(); // clear the DOM element
      this.addAll();
    },

    createItemOnEnter: function (e) {
      if (e.keyCode != 13) return;
      this.createItem();
    },
    createItem: function () {
      if (!this.input.val()) return;
      console.log('creating');
      var titleInput = this.input.val();
      var descInput = this.description.val();
      var estiInput = this.estimation.val();
      var assiInput = this.assigned.val();
      this.input.val('');
      this.description.val('');
      this.estimation.val('');
      this.assigned.val('');
      this.tasks.create({ title: titleInput, description: descInput, estimation: estiInput, assigned: assiInput, status: 'open'});
      
    },

    showOpen: function() {
      console.log('get open Items');
      this.tasks.open();
      console.log('nr. of items:' + this.tasks.length);
      // this.todos.fetch();
      //this.trigger('reload');
    },
    showCompleted: function() {
      console.log('get completed Items');
      this.tasks.completed();
      console.log('nr. of items:' + this.tasks.length);
      // this.todos.fetch();
      //this.trigger('reload');
    },
    showInProgress: function() {
      console.log('get inprogress Items');
      this.tasks.inprogress();
      console.log('nr. of items:' + this.tasks.length);
      // this.todos.fetch();
      //this.trigger('reload');
    },
    showAll: function() {
      console.log('get all Items');
      this.tasks.all();
      console.log('nr. of items:' + this.tasks.length);
     // this.todos.fetch();
     // this.trigger('reload');
    },
    showFirst: function(){
    	 console.log('get first Items');
         this.tasks.all();
         console.log('nr. of items:' + this.tasks.length);
    }


  });





  var taskList = new TaskList();
  var router = new TaskRouter();
  router.setApp(taskList);
  Backbone.history.start();


});