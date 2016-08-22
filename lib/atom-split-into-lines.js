'use babel';

import AtomSplitIntoLinesView from './atom-split-into-lines-view';
import { CompositeDisposable } from 'atom';

export default {

  atomSplitIntoLinesView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomSplitIntoLinesView = new AtomSplitIntoLinesView(state.atomSplitIntoLinesViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomSplitIntoLinesView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-split-into-lines:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomSplitIntoLinesView.destroy();
  },

  serialize() {
    return {
      atomSplitIntoLinesViewState: this.atomSplitIntoLinesView.serialize()
    };
  },

  toggle() {
    console.log('AtomSplitIntoLines was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
