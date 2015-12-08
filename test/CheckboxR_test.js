(function ($) {
    /*
      ======== A Handy Little QUnit Reference ========
      http://api.qunitjs.com/
  
      Test methods:
        module(name, {[setup][ ,teardown]})
        test(name, callback)
        expect(numberOfAssertions)
        stop(increment)
        start(decrement)
      Test assertions:
        ok(value, [message])
        equal(actual, expected, [message])
        notEqual(actual, expected, [message])
        deepEqual(actual, expected, [message])
        notDeepEqual(actual, expected, [message])
        strictEqual(actual, expected, [message])
        notStrictEqual(actual, expected, [message])
        throws(block, [expected], [message])
    */

    module('jQuery#CheckboxR', {
        // This will run before each test in this module.
        setup: function () {
            this.elems = $('#qunit-fixture').children('.test-elem');
        }
    });

    // test default options
    test('defaults', function () {
        expect(9);

        ok($.fn.CheckboxR.options, 'Options set up correctly');

        // check
        equal($.fn.CheckboxR.options.check, 1, "Default global option 'check' is set");
        $.fn.CheckboxR.options.check = 2;
        equal($.fn.CheckboxR.options.check, 2, "Default global option 'check' can be set");

        // checkbox group
        equal($.fn.CheckboxR.options.group, '.checkbox-r-cbs', "Default global option 'group' is set");
        $.fn.CheckboxR.options.group = '.inner-test-elem';
        equal($.fn.CheckboxR.options.group, '.inner-test-elem', "Default global option 'group' can be set");

        // style
        equal($.fn.CheckboxR.options.style, 'radio', "Default global option 'style' is set");
        $.fn.CheckboxR.options.style = 'block';
        equal($.fn.CheckboxR.options.style, 'block', "Default global option 'style' can be set");

        // checkbox
        equal($.fn.CheckboxR.options.checkbox, 'input[type="checkbox"]', "Default global option 'checkbox' is set");
        $.fn.CheckboxR.options.checkbox = '.checkbox-r-cb';
        equal($.fn.CheckboxR.options.checkbox, '.checkbox-r-cb', "Default global option 'checkbox' can be set");
        $.fn.CheckboxR.options.checkbox = 'input[type="checkbox"]';
    });

    // test is chainable
    test('chainable', function () {
        expect(3);
        strictEqual(this.elems.CheckboxR(), this.elems, 'should be chainable');
        ok(this.elems.CheckboxR().addClass('test-me'), "adding class test-me");
        strictEqual(this.elems.hasClass('test-me'), true, "should be chainable with 'addClass'");
    });

    // test container setup
    test('container setup', function () {
        expect(2);

        // check if data-cb attribute added
        strictEqual(this.elems.CheckboxR().attr('data-cb'), '.checkbox-r', 'should have attribute data-cb=".checkbox-r"');

        // check if checkbox-r class added
        strictEqual(this.elems.CheckboxR().hasClass('checkbox-r'), true, "should have class 'checkbox-r'");
    });

    // test sub container
    test('group setup', function () {
        expect(2);

        // check if data-cb-group attribute added
        strictEqual(this.elems.CheckboxR().children('.inner-test-elem').attr('data-cb-group'), '.checkbox-r-cbs', 'should have attribute data-cb-group=".checkbox-r-cbs"');

        // check if checkbox-r-cbs class added
        strictEqual(this.elems.CheckboxR().children('.inner-test-elem').hasClass('checkbox-r-cbs'), true, "should have class 'checkbox-r-cbs'");
    });

    // test elements
    test('group checkboxes', function () {
        expect(2);
        var checkboxSelector = $.fn.CheckboxR.options.checkbox;
        ok(this.elems.CheckboxR().children('.inner-test-elem').find(checkboxSelector), 'selecting checkboxes');
        strictEqual(this.elems.CheckboxR().children('.inner-test-elem').find(checkboxSelector).length, 5, 'should select 5 checkboxes');
    });

    // test element event
    test('click checkbox', function () {
        expect(7);
        var checkboxSelector = $.fn.CheckboxR.options.checkbox;
        this.elems.CheckboxR();

        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).first(), 'selecting first checkbox');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).first().length, 1, 'should select first checkbox');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 0, 'should have 0 checkbox checked');

        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).first().trigger('click'), 'clicking first checkbox');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 1, 'should have 1 checkbox checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).first(':checked').length, 1, 'should have first checkbox checked');
        console.log(this.elems.html());
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').hasClass('checked'), true, "should have checked checkbox with class 'checked'");
    });

    // test element styles: radio
    test('style radio', function () {
        expect(10);

        // set style
        $.fn.CheckboxR.options.style = 'radio';
        var checkboxSelector = $.fn.CheckboxR.options.checkbox;

        // call plugin
        this.elems.CheckboxR();

        // click one at index 0
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).trigger('click'), 'clicking checkbox at index 0');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 1, 'should have 1 checkbox checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");

        // click one at index 1
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).trigger('click'), 'clicking checkbox at index 1');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 1, 'should have 1 checkbox checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).is(':checked'), true, 'should have checkbox at index 1 checked');        
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('checked'), true, "should have checkbox at index 1 with class 'checked'");

        // one at index 0 should be un-checked 
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), false, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), false, "should have checkbox at index 0 without class 'checked'");
    });

    // test element styles: block
    test('style block', function () {
        expect(18);

        // set style
        $.fn.CheckboxR.options.style = 'block';
        $.fn.CheckboxR.options.check = 2;
        var checkboxSelector = $.fn.CheckboxR.options.checkbox;

        // call plugin
        this.elems.CheckboxR();

        // click one at index 0
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).trigger('click'), 'clicking checkbox at index 0');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 1, 'should have 1 checkbox checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");

        // click one at index 1
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).trigger('click'), 'clicking checkbox at index 1');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 2, 'should have 2 checkboxes checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).is(':checked'), true, 'should have checkbox at index 1 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('checked'), true, "should have checkbox at index 1 with class 'checked'");

        // one at index 0 should remain checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");

        // click one at index 2
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).trigger('click'), 'clicking checkbox at index 2');

        // this one should not be checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 2, 'should have 2 checkboxes checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).is(':checked'), false, 'should have checkbox at index 2 not checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).hasClass('checked'), false, "should have checkbox at index 2 without class 'checked'");

        // one at index 0 should remain checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");

        // one at index 1 should also remain checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).is(':checked'), true, 'should have checkbox at index 1 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('checked'), true, "should have checkbox at index 1 with class 'checked'");
    });

    // test element styles: toggle
    test('style toggle', function () {
        expect(27);

        // set style
        $.fn.CheckboxR.options.style = 'toggle';
        $.fn.CheckboxR.options.check = 2;
        var checkboxSelector = $.fn.CheckboxR.options.checkbox;

        // call plugin
        this.elems.CheckboxR();

        // click one at index 0
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).trigger('click'), 'clicking checkbox at index 0');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 1, 'should have 1 checkbox checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('last-checked'), true, "should have checkbox at index 0 with class 'last-checked'");

        // click one at index 1
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).trigger('click'), 'clicking checkbox at index 1');

        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 2, 'should have 2 checkboxes checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).is(':checked'), true, 'should have checkbox at index 1 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('checked'), true, "should have checkbox at index 1 with class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('last-checked'), true, "should have checkbox at index 1 with class 'last-checked'");

        // one at index 0 should remain checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('last-checked'), false, "should have checkbox at index 0 without class 'last-checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('prev-checked'), true, "should have checkbox at index 0 with class 'prev-checked'");

        // click one at index 2
        ok(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).trigger('click'), 'clicking checkbox at index 2');

        // this one should not be checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).filter(':checked').length, 2, 'should have 2 checkboxes checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).is(':checked'), true, 'should have checkbox at index 2 not checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).hasClass('checked'), true, "should have checkbox at index 2 without class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(2).hasClass('last-checked'), true, "should have checkbox at index 2 without class 'last-checked'");

        // one at index 0 should remain checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).is(':checked'), true, 'should have checkbox at index 0 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('checked'), true, "should have checkbox at index 0 with class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('last-checked'), false, "should have checkbox at index 0 without class 'last-checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(0).hasClass('prev-checked'), false, "should have checkbox at index 0 without class 'prev-checked'");

        // one at index 1 should be un-checked
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).is(':checked'), false, 'should have checkbox at index 1 checked');
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('checked'), false, "should have checkbox at index 1 without class 'checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('last-checked'), false, "should have checkbox at index 1 without class 'last-checked'");
        strictEqual(this.elems.children('.inner-test-elem').find(checkboxSelector).eq(1).hasClass('prev-checked'), true, "should have checkbox at index 1 with class 'prev-checked'");
    });
    //TODO add checks for styles

}(jQuery));
