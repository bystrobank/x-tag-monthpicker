(function() {
    function updateMonthPickerInput(monthpicker){
        var y=monthpicker.xtag.year.innerHTML;
        var m=monthpicker.xtag.month.innerHTML;
        if( parseInt( m ) < 10 ) m = "0" + m;
        monthpicker.xtag.monthInput.value=y+'-'+m;
    }
    xtag.register('x-monthpicker', {
        lifecycle: {
            created: function() {
                /*var link = document.querySelector('link[rel="import"]');
                var template = link.import.querySelector('template');
                if(template.content){
                    var clone = document.importNode(template.content, true);
                    this.appendChild(clone);
                }else{ //template.content не работает в seamonkey 2.11
                    var n=template.firstChild;
                    while(n) {
                        this.appendChild(document.importNode(n, true));
                        n=n.nextSibling;
                    }
                }*/
                this.innerHTML='    <input class="x-monthpicker-input" size="7" maxlength="7" placeholder="ГГГГ-ММ"/> \
    <div class="x-monthpicker-popup" > \
        <table> \
            <tr>  \
                <td>  \
                    <a class="x-monthpicker-prevyear" href="javascript:void(0);">  \
                        <i class="fa fa-chevron-circle-left fa-lg"></i>  \
                    </a>  \
                </td>  \
                <td colspan="2"><div class="x-monthpicker-year"></div></td> \
                <td> \
                    <a class="x-monthpicker-nextyear" href="javascript:void(0);"> \
                        <i class="fa fa-chevron-circle-right fa-lg"></i> \
                    </a> \
                </td> \
            </tr> \
            <tr> \
                <td> \
                    <a class="x-monthpicker-prevmonth" href="javascript:void(0);"> \
                        <i class="fa fa-chevron-circle-left fa-lg"></i> \
                    </a> \
                </td> \
                <td colspan="2"><div class="x-monthpicker-month"></div></td> \
                <td> \
                    <a class="x-monthpicker-nextmonth" href="javascript:void(0);"> \
                        <i class="fa fa-chevron-circle-right fa-lg"></i> \
                    </a> \
                </td> \
            </tr> \
        </table> \
    </div>';
                var monthInput = this.querySelector('.x-monthpicker-input');
                this.xtag.monthInput=monthInput;
                monthInput.value=this.getAttribute("value");
                var dt = new Date();
                if(monthInput.value && monthInput.value.match(/^(19|20)[0-9]{2}-(0[1-9]|1[012])$/)){
                    dt = new Date(monthInput.value);
                }
                var year=this.querySelector('.x-monthpicker-year');
                year.innerHTML=dt.getFullYear();
                this.xtag.year=year;
                
                var month=this.querySelector('.x-monthpicker-month');
                month.innerHTML=dt.getMonth() + 1;
                this.xtag.month=month;
                
                
                
                /*
                 var tpl = document.getElementById('monthpicker').content;
                 alert(tpl);
                 this.appendChild(tpl.cloneNode(true));
                 */
            }
        },
        events: {
            'focus': function(e) {
                e.currentTarget.setAttribute("focused", true);
            },
            'blur:delegate(.x-monthpicker-input)': function(e) {
                var datepicker = e.currentTarget;

                datepicker.removeAttribute("focused");

                /*// send parsed version to ensure that text of input matches
                 _watchForChange(datepicker, function(){
                 _updateDatepicker(datepicker, true);
                 }, true);*/
            },
            'click:delegate(.x-monthpicker-prevyear)': function(e) {
                var monthpicker = e.currentTarget;
                monthpicker.xtag.year.innerHTML=parseInt(monthpicker.xtag.year.innerHTML)-1;
                updateMonthPickerInput(monthpicker);
            },
            'click:delegate(.x-monthpicker-nextyear)': function(e) {
                var monthpicker = e.currentTarget;
                monthpicker.xtag.year.innerHTML=parseInt(monthpicker.xtag.year.innerHTML)+1;
                updateMonthPickerInput(monthpicker);
            },
            'click:delegate(.x-monthpicker-prevmonth)': function(e) {
                var monthpicker = e.currentTarget;
                var m=parseInt(monthpicker.xtag.month.innerHTML)-1;
                if(m===0) {
                    m=12;
                }
                monthpicker.xtag.month.innerHTML=m;
                updateMonthPickerInput(monthpicker);
            },
            'click:delegate(.x-monthpicker-nextmonth)': function(e) {
                var monthpicker = e.currentTarget;
                var m=parseInt(monthpicker.xtag.month.innerHTML)+1;
                if(m===13) {
                    m=1;
                }
                monthpicker.xtag.month.innerHTML=m;
                updateMonthPickerInput(monthpicker);
            },
        },
        accessors: {
            "name": {
                attribute: {selector: ".x-monthpicker-input"},
                set: function(newName){
                    var monthInput = this.xtag.monthInput;
                    if(newName === null || newName === undefined){
                        monthInput.removeAttribute("name");
                    }
                    else{
                        monthInput.setAttribute("name", newName);
                    }
                }
            },

            // returns the value that should be submitted to a form
            // note: even if no name attribute is present, still return what
            // should be submitted for cases of dynamic submission
            "submitValue":{
                get: function(){
                    return this.xtag.monthInput.value;
                }
            },

            // handles the currently displayed value of the datepicker
            "value": {
                attribute: {
                    //skip: true
                },
                get: function(){
                    return this.xtag.monthInput.value;
                },
                set: function(value){
                    var monthInput = this.xtag.monthInput;

                    // if prompted to remove value
                    if(value === null || value === undefined){
                        this.removeAttribute("value");
                        monthInput.value = "";
                    }
                    else{
                        this.setAttribute("value",value);
                        monthInput.value = value;
                    }
                }
            }
        }
        

    });
})();