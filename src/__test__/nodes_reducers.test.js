import React from 'react';
import pf from "pretty-immutable" //TODO: revert to pretty-format when it supports immutable
import {fromJS, Map, List} from 'immutable';
import * as C from './constants'
import { addNode, setNodeProps, selectNodeList, getNode, nextNodeId } from "../reducers/nodes"
import { makeStore } from "../store/configureStore"


describe("selectNodeList()", function(){
    let store = makeStore(fromJS({nodes: [C.blue_node, C.red_node2]}));

    it("given redux store should return the list of nodes", function() {
        expect(selectNodeList(store)).toEqual(fromJS([C.blue_node, C.red_node2]))
    })
    it("given the redux state should return the list of nodes", function() {
        expect(selectNodeList(store.getState())).toEqual(fromJS([C.blue_node, C.red_node2]))
    })
    it("given the node list should return same", function() {
        expect(selectNodeList(store.getState().get('nodes'))).toEqual(fromJS([C.blue_node, C.red_node2]))
    })
})

describe("nextNodeId()", function() {
    let store = makeStore(fromJS({nodes: [C.blue_node, C.red_node2]}));
    it("should return the max node ID plus one", function() {
        expect(nextNodeId(store.getState().get('nodes'))).toEqual(C.red_node2.id + 1)
    })
})


describe("nodes reducer", function() {
    let store = makeStore();

    it("should return correct initial state", function() {
        store.dispatch({type: 'UNDEFINED', payload: 0})
        expect(store.getState().get('nodes')).toEqual(new List());
    })

    it("should add new nodes", () => {
        store.dispatch(addNode(C.blue_node))
        expect(store.getState().get('nodes').size).toEqual(1)
        store.dispatch(addNode(C.red_node2))
        expect(store.getState().get('nodes').size).toEqual(2)
    })

    it("should set node props", () => {
        store.dispatch(setNodeProps({
            id: 5,
            health: 20,
            owner: C.BLUE
        }))

        let node = getNode(store, 1)
        expect(node).toBeDefined()
        Map.isMap(node)
        expect(node.get('owner')).toEqual(C.BLUE);
        expect(node.get('power')).toEqual(3);
    })

    it("should assign next node IDs", function() {
        store.dispatch(addNode({}))
        expect(getNode(store, 6)).toBeDefined()
    })
})