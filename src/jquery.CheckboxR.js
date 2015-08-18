/*
 * CheckboxR
 * https://github.com/mubtxs/checkboxr
 *
 * Copyright (c) 2015 mubtxs
 * Licensed under the MIT license.
 */

(function ($) {

    "use strict";

    // Collection method.
    $.fn.CheckboxR = function (options) {
        // Override default options with passed-in options.
        options = $.extend({}, $.fn.CheckboxR.options, options);

        // Get data elements
        var dataCbCheck = 'data-cb-check';
        var dataCbStyle = 'data-cb-style'
        var dataCbCheckbox = 'data-cb-checkbox';

        // get reference to container
        var $this = $(this);

        // add root data attribute
        if ($this.attr('data-cbs') === undefined) {
            $this.attr('data-cbs', 'checkbox-r')
        }

        // add root class
        if (!$this.hasClass('checkbox-r')) {
            $this.addClass('checkbox-r');
        }

        // check if any checkboxes exists
        if ($this.find('.checkbox-r-cbs') === undefined || $this.find('input[type="checkbox"]') === undefined) {
            return;
        }

        $this.find('.checkbox-r-cbs').each(function (i) {

            // get sub-container reference
            var _this = $(this);

            // get element options with element taking precedence
            var checkboxSelector = _this.attr(dataCbCheckbox) || $this.attr(dataCbCheckbox) || options.checkbox || 'input[type="checkbox"]';
            var check = parseInt(_this.attr(dataCbCheck) || $this.attr(dataCbCheck) || options.check || 1);
            var style = (_this.attr(dataCbStyle) || $this.attr(dataCbStyle) || options.style || 'radio').toLowerCase();

            // get all checkboxes in sub-container
            var checkboxes = _this.find(checkboxSelector);

            // if none, do nothing
            if (checkboxes === undefined) {
                return;
            }

            checkboxes.each(function (i) {

                // get reference
                var _checkbox = $(this);
                     
                // change event
                _checkbox.on('change', function (e) {

                    // enforce element type as checkbox
                    if (_checkbox.is('input[type="checkbox"]')) {
                        
                        // implement style
                        switch (style) {
                            case 'radio':

                                // NOTE: 'check' option value is ignored here

                                // get checked boxes
                                var checkedCheckboxes = checkboxes.filter('.checked');

                                // un-check these
                                if (!objectIsUndefinedOrEmpty(checkedCheckboxes)) {
                                    checkedCheckboxes.removeClass('checked');
                                }

                                if (_checkbox.is(':checked')) {

                                    if (!objectIsUndefinedOrEmpty(checkedCheckboxes)) {
                                        checkedCheckboxes.each(function (i) {
                                            // un-check any checked
                                            if ($(this).is(':checked')) {
                                                $(this).prop('checked', false);
                                            }
                                        });
                                    }

                                    // mark current as checked
                                    _checkbox.addClass('checked');
                                }

                                break;

                            case 'block':

                                if (_checkbox.is(':checked')) {

                                    // get checked boxes
                                    var checkedCheckboxes = checkboxes.filter('.checked');

                                    // get checked count
                                    var numberOfChecked = 0;
                                    if (!objectIsUndefinedOrEmpty(checkedCheckboxes)) {
                                        numberOfChecked = checkedCheckboxes.length;
                                    }

                                    // if max reached
                                    if (numberOfChecked == check) {
                                        alert('Only ' + check + ' choices allowed.');
                                        // un-check current
                                        _checkbox.prop('checked', false);
                                    }

                                    if (numberOfChecked < check) {
                                        // mark current as checked
                                        if (!_checkbox.hasClass('checked')) {
                                            _checkbox.addClass('checked');
                                        }
                                    }
                                }

                                else {
                                    // mark as unchecked
                                    if (_checkbox.hasClass('checked')) {
                                        _checkbox.removeClass("checked");
                                    }
                                }

                                break;

                            case 'toggle':

                                if (_checkbox.is(':checked')) {

                                    // get checked boxes
                                    var checkedCheckboxes = checkboxes.filter('.checked');

                                    // get checked count
                                    var numberOfChecked = 0;
                                    if (!objectIsUndefinedOrEmpty(checkedCheckboxes)) {
                                        numberOfChecked = checkedCheckboxes.length;
                                    }

                                    // get last checked
                                    var lastChecked = checkboxes.filter('.last-checked');

                                    // get previously checked
                                    var prevChecked = checkboxes.filter('.prev-checked');

                                    if (!objectIsUndefinedOrEmpty(lastChecked)) {

                                        // remove previously checked
                                        if (!objectIsUndefinedOrEmpty(prevChecked)) {
                                            prevChecked.removeClass('prev-checked');
                                        }

                                        if (numberOfChecked == check) {

                                            // mark as unchecked
                                            if (lastChecked.hasClass('checked')) {
                                                lastChecked.removeClass('checked');
                                            }

                                            // un-check
                                            lastChecked.prop('checked', false);
                                        }

                                        // mark as previously checked
                                        lastChecked.removeClass('last-checked').addClass('prev-checked');
                                    }

                                    // mark current as checked
                                    if (!_checkbox.hasClass('checked')) {
                                        _checkbox.addClass('checked');
                                    }

                                    // mark current as last checked
                                    _checkbox.addClass('last-checked');
                                }

                                else {
                                    // else mark as unchecked
                                    if (_checkbox.hasClass('checked')) {
                                        _checkbox.removeClass('checked');
                                    }

                                    // mark current as checked
                                    if (_checkbox.hasClass('last-checked')) {
                                        _checkbox.removeClass('last-checked');
                                    }

                                    // get last checked
                                    var lastChecked = checkboxes.filter('.last-checked');

                                    // remove last checked
                                    if (objectIsUndefinedOrEmpty(lastChecked)) {
                                        lastChecked.removeClass('last-checked');
                                    }

                                    // get previously checked
                                    var prevChecked = checkboxes.filter('.prev-checked');

                                    // remove prev checked
                                    if (objectIsUndefinedOrEmpty(prevChecked)) {
                                        prevChecked.removeClass('prev-checked');
                                    }
                                }

                                break;
                        }

                    }
                });
            });

        });

        return this;
    };

    function objectIsUndefinedOrEmpty(object) {
        return object === undefined || object.length === 0;
    }

    // Static method default options.
    $.fn.CheckboxR.options = {
        // checkbox: '.checkbox-r-cb', // checkbox selector
        check: 1, // max number of concurrent choices
        style: 'radio'  // effect when max concurrent choices reached. this applies on container element
    };
}(jQuery));