'use babel';

import SplitIntoLinesView from './split-into-lines-view';
import { CompositeDisposable } from 'atom';

export default {

  splitIntoLinesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.splitIntoLinesView = new SplitIntoLinesView(state.splitIntoLinesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.splitIntoLinesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'split-into-lines:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.splitIntoLinesView.destroy();
  },

  serialize() {
    return {
      splitIntoLinesViewState: this.splitIntoLinesView.serialize()
    };
  },

  toggle() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let reverse = selection.split(', ').join(',\n')
      editor.insertText(reverse)
    }
  }
};
