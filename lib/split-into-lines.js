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

    // Register command that splits this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'split-into-lines:split': () => this.split()
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

  split() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let selection = editor.getSelectedText()
      let bufferRange = editor.getSelectedBufferRange()
      let splited = selection.replace(/ /g, '').split(',')
      bufferRange.start.column = 0
      bufferRange.end.row += splited.length - 1

      joined_text = splited.join(',\n')

      editor.insertText(joined_text)
      editor.setSelectedBufferRange(bufferRange)
      editor.indentSelectedRows()
    }
  }
};
