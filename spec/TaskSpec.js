"use strict";

describe("Task", function() {
  var tasks;

  beforeEach(function() {
    tasks = new App.Collection.TasksCollection([{title: "SpecTest"},{title:"TestCompleted", status:"inprogress"},{title:"TestCompleted", status:"completed"}]);

    //taskView = new App.View.TaskView({ model: tasks });
    
  });

  describe("basic object oriented features", function() {

    it("Check properties of a Task", function() {
      //when
      var task = tasks.at(0);
      
      //then
      expect(task.get('title')).toBe('SpecTest');
      expect(task.get('status')).toBe('open');
      expect(task.get('assigned')).toBe('test');
    });
    
    it("Create a new task with status completed", function() {
      //when
      
      var task = tasks.at(2);
      
      //then
      expect(task.get('title')).toBe('TestCompleted');
      expect(task.get('status')).toBe('completed');
    });
    
    it("Check if tasks are in open status", function() {
      //when
      
      var openTask = tasks.getOpenTask();
      
      //then
      expect(openTask.length).toEqual(1);

    });
    
    it("Check if tasks are in completed status", function() {
      //when
      
      var completedTask = tasks.getCompletedTask();
      
      //then
      expect(completedTask.length).toEqual(1);

    });
    it("Check if tasks are in progress status", function() {
      //when
      
      var inProgressTask = tasks.getInProgressTask();
      
      //then
      expect(inProgressTask.length).toEqual(1);

    });
    
  });

});
