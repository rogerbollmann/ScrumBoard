$(function () {


// Model

  var Todo = Backbone.Model.extend({
    defaults: {
      title: '',
      done: false
    },

    toggle: function() {
      this.save( {done: !this.get('done')} );
    }

  });

  var TodosCollection = Backbone.Collection.extend({
    model: Todo,
    url: '/todos'
  });

  var todos = new TodosCollection();

  var TodoView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
      "click .toggle"   : "toggleDone",
      "dblclick .view"  : "edit",
      "keypress .edit"  : "updateOnEnter",
      "blur .edit"      : "close"
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.toggleClass('done', this.model.get('done'));
      this.input = this.$('.edit');
      return this;
    },
    toggleDone: function() {
      this.model.toggle();
    },
    edit: function() {
      this.$el.addClass("editing");
      this.input.focus();
    },
    close: function() {
      var value = this.input.val();
      if (!value) {
        this.clear();
      } else {
        this.model.save({title: value});
        this.$el.removeClass("editing");
      }
    },
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },
  });

  var TodoList = Backbone.View.extend({
    el: $('#todoapp'),

    render: function () {
      console.log('called render');
    },

    events: {
      'click #add-item': 'createItem',
      'keypress #new-todo': 'createItemOnEnter'
    },

    initialize: function () {
      this.delegateEvents(this.events);
      this.input = $('#new-todo');

      this.listenTo(todos, 'add', this.addItem);
      this.listenTo(todos, 'reset', this.addAll);
      this.listenTo(todos, 'all', this.render);

      todos.fetch({reset: true});
    },

    addItem: function (item) {
      var todoView = new TodoView({ model: item });
      this.$el.append(todoView.render().el);
    },

    addAll: function() {
      todos.each(this.addItem, this);
    },

    createItemOnEnter: function(e) {
      if (e.keyCode != 13) return;
      this.createItem();
    },
    createItem: function() {
      if(!this.input.val()) return;
      todos.create({ title: this.input.val() });
      this.input.val('');
    }
  });

  var todoList = new TodoList;

});
