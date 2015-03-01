describe('Evaluator', function(){

   var Evaluate = require('../');
   var should = require('should');

   describe('Greater Than', function(){
      it('should evaluate a basic greater than instruction', function(done){

         var data = {
           total : 200,
           test : 220
         };

         var instruction = {
            left : { model : 'total' },
            func : 'gt',
            right : { value : 180 }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('Less Than', function(){
      it('should evaluate a basic less than instruction', function(done){

         var data = {
           total : 200,
           test : 180
         };

         var instruction = {
            left : { model : 'total' },
            func : 'lt',
            right : { value : 220 }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('Greater Than or Equal To', function(){
      it('should evaluate a basic greater than or equal to instruction', function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : { model : 'total' },
            func : 'gte',
            right : { value : 180 }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('Less Than or Equal To', function(){
      it('should evaluate a basic less than or equal to instruction', function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : { model : 'total' },
            func : 'lte',
            right : { value : 210 }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('Equal To', function(){
      it('should evaluate a basic equal to instruction', function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : { model : 'total' },
            func : 'eq',
            right : { value : 200 }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('In', function(){
      it("should evaluate a basic 'In' instruction", function(done){

         var data = {
           group_id : 2,
           groups : [1, 2, 3]
         };

         var instruction = {
            left : { model : 'group_id' },
            func : 'in',
            right : { model : 'groups'}
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('And', function(){
      it("should evaluate two instructions in a 'And' statement", function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : {
               left : { model : 'total' },
               func : 'gt',
               right : { value : 180 }
            },
            func : 'and',
            right : {
               left: { model : 'test' },
               func : 'eq',
               right : { model : 'total' }
            }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);
         

         done();

      })
   });

   describe('Or', function(){
      it("should evaluate two instructions in a 'Or' statement", function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : {
               left : { model : 'total' },
               func : 'gt',
               right : { value : 180 }
            },
            func : 'or',
            right : {
               left: { model : 'test' },
               func : 'gt',
               right : { model : 'total' }
            }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         done();

      })
   });

   describe('.checks', function(){
      it("should return a detailed account of the checks performed and their results", function(done){

         var data = {
           total : 200,
           test : 200
         };

         var instruction = {
            left : {
               left : { model : 'total' },
               func : 'gt',
               right : { value : 180 }
            },
            func : 'or',
            right : {
               left: { model : 'test' },
               func : 'gt',
               right : { model : 'total' }
            }
         };

         var test = new Evaluate(instruction, data);
         test.state.should.equal(true);

         test.checks.succeeded.length.should.equal(2);
         test.checks.failed.length.should.equal(1);

         done();

      })
   });


});