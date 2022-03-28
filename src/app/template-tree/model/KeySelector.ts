export class KeySelectorLabel {
  beLabel: string;
  treeLabel: string;
}

export class KeySelector {
  beParentSelector: string;
  properties: KeySelectorLabel[];
  next?: KeySelector;
}
