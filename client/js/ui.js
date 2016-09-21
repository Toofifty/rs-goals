/**
 * ui.js
 *
 */
 
/* global $ */
 
var tooltip = null;

var activateTooltips = function() {
 
    $(".has-tooltip").mouseenter(function() {
        
        if (tooltip == null) {
            
            $("body").append("<div class='tooltip'>");
            tooltip = $(".tooltip");
            
            tooltip.html($(this).attr("tooltip"));
            
            var offset = $(this).offset();
            
            tooltip.css({
               top: offset.top + $(this).innerHeight() + 10,
               left: offset.left + ($(this).innerWidth() - tooltip.innerWidth()) / 2
            });
            
        }
        
    }).mouseleave(function() {
        
        if (tooltip != null) {
            
            tooltip.remove();
            tooltip = null;
            
        }
        
    });
    
};