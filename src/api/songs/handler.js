/* eslint-disable no-unused-vars */
const autoBind = require('auto-bind');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    autoBind(this);
  }

  postSongHandler(request, h) {
    const {
      title = 'untitled', year, genre, performer, duration, albumId,
    } = request.payload;

    const songId = this._service.addSong({
      title, year, genre, performer, duration, albumId,
    });

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  }

  getSongsHandler() {
    const songs = this._service.getSongs();
    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  getSongByIdHandler(request, h) {
    const { id } = request.params;
    const song = this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  putSongByIdHandler(request, h) {
    const { id } = request.params;

    this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Berhasil mengubah data song',
    };
  }

  deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Data berhasil dihapus',
    };
  }
}

module.exports = SongsHandler;
