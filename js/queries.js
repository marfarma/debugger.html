"use strict";

/* Selectors */
function getSources(state) {
  return state.sources.get("sources");
}

function getSourcesText(state) {
  return state.sources.get("sourcesText");
}

function getSelectedSource(state) {
  return state.sources.get("selectedSource");
}

function getSelectedSourceOpts(state) {
  return state.sources.get("selectedSourceOpts");
}

function getBreakpoints(state) {
  return state.breakpoints.get("breakpoints");
}

function getTabs(state) {
  return state.tabs.get("tabs");
}

function getSelectedTab(state) {
  return state.tabs.get("selectedTab");
}

function getPause(state) {
  return state.pause.get("pause");
}

/* Queries */
function getSource(state, actor) {
  return getSources(state).get(actor);
}

function getSourceCount(state) {
  return getSources(state).size;
}

function getSourceByURL(state, url) {
  return getSources(state).find(source => source.get("url") == url);
}

function getSourceByActor(state, actor) {
  return getSources(state).find(source => source.get("actor") == actor);
}

function getSourceText(state, actor) {
  return getSourcesText(state).get(actor);
}

function getBreakpoint(state, location) {
  return getBreakpoints(state).get(makeLocationId(location));
}

function getBreakpointByActor(state) {
  return getBreakpoints(state).valueSeq()
    .groupBy(bp => bp.getIn(["location", "actor"]));
}

function getBreakpointsForSource(state, actor) {
  return getBreakpointByActor(state).get(actor);
}

/**
 * @param object - location
 */
function makeLocationId(location) {
  return location.actor + ":" + location.line.toString();
}

module.exports = {
  getSource,
  getSources,
  getSourceCount,
  getSourceByURL,
  getSourceByActor,
  getSelectedSource,
  getSelectedSourceOpts,
  getSourceText,
  getBreakpoint,
  getBreakpoints,
  getBreakpointsForSource,
  getTabs,
  getSelectedTab,
  getPause,
  makeLocationId
};
