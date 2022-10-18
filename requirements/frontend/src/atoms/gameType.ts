export interface GameType {
  mode: number;
  Id?: number;
  speed?: number;
}

// mode: 0 => Id: unnecessary = rank

// mode: 1 => Id: uid, speed: 0.5~3 = invite

// mode: 2 =? Id: uid = invited

// mode: 3 => Id: uid = spec
