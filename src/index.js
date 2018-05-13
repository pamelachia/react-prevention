import React from "react";
import PropTypes from "prop-types";

class Prevention extends React.Component {
    capitalise(str) {
        // Simple, but shamelessly copied from: https://stackoverflow.com/a/1026087
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /**
     * Returns all the props that are not explicitly declared in the propTypes object
     * @returns {Object}
     */
    getUndeclaredProps() {
        const usedPropKeys = Object.keys(Prevention.propTypes);
        const events = [];
        for (let propKey in this.props) {
            if (usedPropKeys.indexOf(propKey) === -1) {
                events.push(propKey);
            }
        }

        return events;
    }

    /**
     * Returns an object with events matched with each event's prevention function
     * @returns {Object}
     */
    getPreventionOnEvents() {
        const eventsWithPrevent = {};

        this.getUndeclaredProps().forEach(event => {
            // autofix missing "on" to allow for shortcuts
            if (event.indexOf("on") !== 0) {
                event = `on${this.capitalise(event)}`;
            }

            eventsWithPrevent[event] = this.prevent.bind(this);
        });

        return eventsWithPrevent;
    }

    /**
     * Triggers prevention functions on the parameter according to the props
     * @param {Object} event The target objext
     */
    prevent(event) {
        if (!this.props.allowDefault) {
            event.preventDefault();
        }

        if (!this.props.allowPropagation) {
            event.stopPropagation();
        }
    }

    render() {
        // render an element compatible with the children
        const Wrapper = this.props.inline ? "span" : "div";

        return (
            <Wrapper {...this.getPreventionOnEvents()} style={this.props.style}>
                {this.props.children}
            </Wrapper>
        );
    }
}

// This component also accepts events like "click" or "onClick" as boolean props
Prevention.propTypes = {
    children: PropTypes.node.isRequired,
    /**
     * Allows the default behaviour of the child components
     */
    allowDefault: PropTypes.bool,
    /**
     * Allows propagation to the parent components
     */
    allowPropagation: PropTypes.bool,
    /**
     * Turns the wrapping element into a span
     */
    inline: PropTypes.bool,
    /**
     * Adds CSS rules to the wrapper
     */
    style: PropTypes.object
};

export default Prevention;
